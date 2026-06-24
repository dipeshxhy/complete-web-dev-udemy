import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode in https://localhost:${port}`,
  );
});
