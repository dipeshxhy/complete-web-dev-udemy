import "dotenv/config";
import express from "express";

const port = process.env.PORT || 8000;

const app = express();
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.listen(port, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode in https://localhost:${port}`,
  );
});
