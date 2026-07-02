import express from "express";
import fs from "fs";

import cors from "cors";

import logger from "../logger.js";
import morgan from "morgan";

// routers
import healthcheckRouter from "./routes/healthcheck.routes.js";

const morganFormat = ":method :url :status :response-time ms";

const app = express();
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));

// cors setup
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

//  logger setup
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);

// routes setup
app.use("/api/v1/healthcheck", healthcheckRouter);

export default app;
