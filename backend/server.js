require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const databaseConnection = require("./configuration/db");
const authRouter = require("./routers/auth.routers");
const scraperRouter = require("./routers/scrape.routers");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.set('trust proxy', 1);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());


app.get("/api/health", (_, res) => {
  console.log(`Health check ping received at: ${new Date().toISOString()}`);
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Data is fetched from the backend perfectly",
  });
});

app.use('/api/auth', authRouter);
app.use('/api', scraperRouter);
require('./cron/priceCheck.cron');


const startServer = async () => {
  try {
    await databaseConnection(process.env.MONGODB_URL);

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down...");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
