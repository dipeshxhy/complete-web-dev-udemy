import cors from "cors";
import express from "express";
import morgan from "morgan";

import { ApiError } from "./utils/api-error.js";

// routers
import healthCheckRouter from "./routes/healthcheck.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();

// global middlewares
app.use(
  express.json({
    limit: "16kb",
  }),
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
// cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  }),
);

// morgan logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("welcome to base camp project");
});

// api
app.use("/api/v1/healthcheck", healthCheckRouter);

app.all("/*splat", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});
app.use(errorHandler);
export default app;
