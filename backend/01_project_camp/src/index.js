import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  try {
    await connectDB();
    console.log(
      `Server is running on ${process.env.NODE_ENV} mode in https://localhost:${port}`,
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
});
