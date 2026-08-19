const Profile = require("../models/Profile");
const { deleteCloudinaryImage } = require("../config/cloudinaryHelper");

// Fields any employee can set on their OWN profile — personal/contact
// info only. Designation, department, employee_code etc. are deliberately
// excluded here; those are organizational facts, not self-declared ones.
const SELF_EDITABLE_FIELDS = [
  "full_name",
  "gender",
  "date_of_birth",
  "bio",
  "phone",
  "alternate_phone",
  "address_line1",
  "address_line2",
  "city",
  "state",
  "country",
  "postal_code",
  "emergency_contact_name",
  "emergency_contact_phone",
  "emergency_contact_relation",
  "linkedin_url",
  "github_url",
  "portfolio_url",
];

// Fields ONLY a manager/CEO can set — organizational/employment facts.
// Enforced by requireApproverRole in profile.routes.js on this route.
const ADMIN_EDITABLE_FIELDS = [
  "designation",
  "department",
  "employee_code",
  "date_of_joining",
  "employment_type",
  "reporting_manager",
];

class ProfileController {
  // GET /profile/me — get the logged-in user's own profile
  static async getMe(req, res) {
    try {
      const userId = req.user.id;

      let profile = await Profile.findOne({ where: { user_id: userId } });

      if (!profile) {
        profile = await Profile.create({ user_id: userId });
      }

      return res.status(200).json({ success: true, data: profile });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // PATCH /profile/me — self-service update. Designation/department/etc.
  // are NOT accepted here even if sent in the request body.
  static async upsertMe(req, res) {
    try {
      const userId = req.user.id;
      const avatar = req.file?.path;

      const updates = {};
      for (const field of SELF_EDITABLE_FIELDS) {
        if (req.body[field] !== undefined) updates[field] = req.body[field];
      }

      let profile = await Profile.findOne({ where: { user_id: userId } });

      if (!profile) {
        profile = await Profile.create({ user_id: userId, ...updates, avatar });
        return res.status(201).json({
          success: true,
          message: "Profile created successfully.",
          data: profile,
        });
      }

      if (avatar && profile.avatar) {
        await deleteCloudinaryImage(profile.avatar);
      }

      await profile.update({ ...updates, avatar: avatar || profile.avatar });

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        data: profile,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // PATCH /profile/:userId/employment — manager/CEO only. This is the
  // ONLY place designation/department/employee_code/etc. can be set.
  // Route-level requireApproverRole in profile.routes.js enforces the
  // role check before this ever runs.
  static async updateEmployment(req, res) {
    try {
      const targetUserId = req.params.userId;

      const updates = {};
      for (const field of ADMIN_EDITABLE_FIELDS) {
        if (req.body[field] !== undefined) updates[field] = req.body[field];
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          success: false,
          message: "No valid employment fields provided.",
        });
      }

      let profile = await Profile.findOne({ where: { user_id: targetUserId } });

      if (!profile) {
        // Manager may be setting designation for someone who's never
        // opened their own profile page yet — create the row for them.
        profile = await Profile.create({ user_id: targetUserId, ...updates });
        return res.status(201).json({
          success: true,
          message: "Employment details set successfully.",
          data: profile,
        });
      }

      await profile.update(updates);

      return res.status(200).json({
        success: true,
        message: "Employment details updated successfully.",
        data: profile,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /profile/:userId — manager/CEO/admin view of another user's profile
  static async getByUserId(req, res) {
    try {
      const profile = await Profile.findOne({
        where: { user_id: req.params.userId },
      });

      if (!profile) {
        return res.status(404).json({ success: false, message: "Profile not found." });
      }

      return res.status(200).json({ success: true, data: profile });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /profile — list all profiles (manager/CEO/admin dashboard)
  static async getAll(req, res) {
    try {
      const data = await Profile.findAll({ order: [["createdAt", "DESC"]] });
      return res.status(200).json({ success: true, total: data.length, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // DELETE /profile/:userId — admin-only cleanup
  static async delete(req, res) {
    try {
      const profile = await Profile.findOne({
        where: { user_id: req.params.userId },
      });

      if (!profile) {
        return res.status(404).json({ success: false, message: "Profile not found." });
      }

      if (profile.avatar) await deleteCloudinaryImage(profile.avatar);

      await profile.destroy();

      return res.status(200).json({ success: true, message: "Profile deleted successfully." });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = ProfileController;