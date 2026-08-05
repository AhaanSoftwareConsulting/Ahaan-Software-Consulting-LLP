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
  "https://admin.ahaanmedia.com",
  "https://ahaan-software-admin.vercel.app",
  "https://stagging.ahaanmedia.com",
  "https://ahaan-software.vercel.app",
  "https://ahaansoftware.com",
  "https://portfolio-ahaanmedia.vercel.app",
  "https://ahaan-software-consulting-llp.vercel.app",
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
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/test", require("./routes/testRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const io = require("socket.io")(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
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