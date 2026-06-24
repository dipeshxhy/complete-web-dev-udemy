import cors from "cors";
import express from "express";

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

app.get("/", (req, res) => {
  res.send("welcome to base camp project");
});

export default app;
