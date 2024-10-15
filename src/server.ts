import mongoose from "mongoose";
import config from "./config";
import { Server } from "http";
import app from "./app";

process.on("uncaughtException", (error) => {
  console.log(`Uncaught Exception: ${error}`);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log(`Database connected successfully 🛰`);

    server = app.listen(config.port, () => {
      console.log(`Server started on port ${config.port} 🚀`);
    });
  } catch (error) {
    console.log(`Failed to connect to database 🚩`, error);
  }

  process.on("unhandledRejection", (error) => {
    console.log(`Unhandled Rejection at 🚨: ${error}`);
    server?.close(() => {
      process.exit(1);
    });
  });
}

main();
