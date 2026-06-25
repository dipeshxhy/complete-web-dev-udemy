import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/index.js";
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 8000;

const server = app.listen(port, async () => {
  try {
    await connectDB();
    console.log(
      `Server is running on ${process.env.NODE_ENV} mode in https://localhost:${port}`,
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
});

// 🔥 Async errors
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
