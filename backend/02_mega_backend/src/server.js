import "dotenv/config";

import http from "node:http";
import app from "./app.js";
import connectDB from "./db/index.js";

const server = http.createServer(app);
const port = process.env.PORT || 8000;

server.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port http://localhost:${port}...`);
});
