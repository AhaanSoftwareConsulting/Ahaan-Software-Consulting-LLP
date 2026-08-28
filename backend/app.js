const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");

dotenv.config();

const app = express();
const server = http.createServer(app);

// MySQL
const sequelize = require("./config/db");
require("./models");

// Allowed CORS Origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://admin.ahaanmedia.com",
  "https://ahaan-software-admin.vercel.app",
  "https://stagging.ahaanmedia.com",
  "https://ahaan-software.vercel.app",
  "https://ahaansoftware.com",
  "https://portfolio-ahaanmedia.vercel.app",
  "https://ahaan-software-consulting-llp.vercel.app",
  "https://admin-ahaan-software-consulting-llp-beta.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Blocked"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/designs", require("./routes/designRoutes"));
app.use("/api/developments", require("./routes/developmentRoutes"));
app.use("/api/social", require("./routes/socialMediaRoutes"));
app.use("/api/appDev", require("./routes/appDevRoutes"));
app.use("/api/connect", require("./routes/connectRoute"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/newsletter", require("./routes/newsletterRoutes"));
app.use("/profile", require("./routes/profileRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});


const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // MySQL Connection Test
    await sequelize.authenticate();
    console.log("✅ MySQL Connected Successfully");

    // Sequelize Models Sync
    await sequelize.sync();
    console.log("✅ MySQL Tables Synced");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MySQL Connection Error");
    console.error(err);
  }
})();
