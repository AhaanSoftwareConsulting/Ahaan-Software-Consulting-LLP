require("dotenv").config();

const mongoose = require("mongoose");
const sequelize = require("../config/db");

const ContactMongo = require("../models/ContactForm");
const ContactForm = require("../models/ContactFormSQL");

async function migrateContactForms() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await sequelize.authenticate();
    console.log("✅ MySQL Connected");

    const contacts = await ContactMongo.find();

    console.log(`Total Contact Forms: ${contacts.length}`);

    let inserted = 0;

    for (const item of contacts) {
      await ContactForm.create({
        name: item.name,
        email: item.email,
        phone: item.phone,
        website: item.website,
        message: item.message,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });

      inserted++;
    }

    console.log(`✅ ${inserted} Contact Forms Migrated Successfully`);

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrateContactForms();