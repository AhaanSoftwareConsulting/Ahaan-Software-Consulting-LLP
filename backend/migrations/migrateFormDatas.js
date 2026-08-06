require("dotenv").config();

const mongoose = require("mongoose");
const sequelize = require("../config/db");

const FormDataMongo = require("../models/FormData");
const FormData = require("../models/FormDataSQL");

async function migrateFormDatas() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await sequelize.authenticate();
    console.log("✅ MySQL Connected");

    const forms = await FormDataMongo.find();

    console.log(`Total Form Datas: ${forms.length}`);

    let inserted = 0;

    for (const item of forms) {
      await FormData.create({
        name: item.name,
        email: item.email,
        service: item.service,
        budget: item.budget,
        projectDetails: item.projectDetails,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt || item.createdAt,
      });

      inserted++;
    }

    console.log(`✅ ${inserted} Form Datas Migrated Successfully`);

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrateFormDatas();