const BusinessCheck = require("../models/BusinessCheck");
const BusinessCheckPrize = require("../models/BusinessCheckPrize");
const sequelize = require("../config/db");

// POST /api/business-check
exports.submitBusinessCheck = async (req, res) => {
  try {
    const {
      name,
      business,
      mobile,
      email,
      websiteStatus,
      improvements,
      interest,
      timeline,
      discussion,
      referral,
      referralDetails,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !business ||
      !mobile ||
      !email ||
      !websiteStatus ||
      !interest ||
      !timeline ||
      !discussion
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing email
    const existingLead = await BusinessCheck.findOne({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingLead) {
      return res.status(409).json({
        message: "This email has already submitted the business check",
        alreadySubmitted: true,
      });
    }

    // Convert improvements array to string
    const improvementsStr = Array.isArray(improvements)
      ? improvements.join(", ")
      : improvements || null;

    // Create lead
    const lead = await BusinessCheck.create({
      name: name.trim(),
      business: business.trim(),
      mobile: mobile.trim(),
      email: normalizedEmail,
      websiteStatus,
      improvements: improvementsStr,
      interest,
      timeline,
      discussion,
      referral: referral || null,
      referralDetails: referralDetails || null,
    });

    return res.status(201).json({
      message: "Lead saved",
      id: lead.id,
    });
  } catch (err) {
    console.error("❌ submitBusinessCheck error:", err);

    // Duplicate email
    if (
      err.name === "SequelizeUniqueConstraintError" ||
      err.original?.code === "ER_DUP_ENTRY"
    ) {
      return res.status(409).json({
        message: "This email has already submitted the business check",
        alreadySubmitted: true,
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// POST /api/business-check/spin
exports.spinBusinessCheck = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find submission
    const lead = await BusinessCheck.findOne({
      where: {
        email: normalizedEmail,
      },
    });

    if (!lead) {
      return res.status(404).json({
        message: "Submit the business check form first",
      });
    }

    // Already spun
    if (lead.hasSpun) {
      return res.status(409).json({
        message: "This email has already spun",
        prize: lead.prizeWon,
      });
    }

    // Pick random prize
    const prize =
      PRIZES[Math.floor(Math.random() * PRIZES.length)];

    /*
     * Atomic update.
     *
     * Only update when has_spun is still false.
     * This prevents two simultaneous requests
     * from getting two different prizes.
     */
    const [updatedRows] = await BusinessCheck.update(
      {
        hasSpun: true,
        prizeWon: prize,
        spunAt: new Date(),
      },
      {
        where: {
          id: lead.id,
          hasSpun: false,
        },
      }
    );

    // Another request may have spun first
    if (updatedRows === 0) {
      const latestLead = await BusinessCheck.findByPk(lead.id);

      return res.status(409).json({
        message: "This email has already spun",
        prize: latestLead?.prizeWon || null,
      });
    }

    return res.json({
      prize,
    });
  } catch (err) {
    console.error("❌ spinBusinessCheck error:", err);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.spinBusinessCheck = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { email } = req.body;

    if (!email) {
      await transaction.rollback();

      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const lead = await BusinessCheck.findOne({
      where: {
        email: normalizedEmail,
      },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!lead) {
      await transaction.rollback();

      return res.status(404).json({
        message: "Submit the business check form first",
      });
    }

    // Already used spin
    if (lead.hasSpun) {
      await transaction.rollback();

      return res.status(409).json({
        message: "This email has already spun",
        prize: lead.prizeWon,
      });
    }

    // Get prizes that still have stock
    const prizes = await BusinessCheckPrize.findAll({
      where: {
        stock: {
          [require("sequelize").Op.gt]: 0,
        },
      },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    // All 30 prizes used
    if (prizes.length === 0) {
      await transaction.rollback();

      return res.status(410).json({
        message: "All prizes have been claimed",
        soldOut: true,
      });
    }

    // Random prize from available prizes
    const selectedPrize =
      prizes[Math.floor(Math.random() * prizes.length)];

    // Decrease stock
    selectedPrize.stock -= 1;
    await selectedPrize.save({
      transaction,
    });

    // Save spin
    lead.hasSpun = true;
    lead.prizeWon = selectedPrize.prize;
    lead.spunAt = new Date();

    await lead.save({
      transaction,
    });

    await transaction.commit();

    return res.json({
      prize: selectedPrize.prize,
      prizeId: selectedPrize.id,
      remainingStock: selectedPrize.stock,
    });
  } catch (err) {
    await transaction.rollback();

    console.error("❌ spinBusinessCheck error:", err);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

