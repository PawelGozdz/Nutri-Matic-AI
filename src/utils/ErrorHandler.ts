import { Logger } from "../libs";

export function errorHandling() {
  process.on("uncaughtException", (error) => {
    Logger.error("Uncaught exception:", error);
    // Here you can add any cleanup code
    process.exit(1); // exit application with non-zero status code
  });

  process.on("unhandledRejection", (_reason, promise) => {
    Logger.error("Unhandled Rejection at:", promise);
    // Here you can add any cleanup code
    process.exit(1); // exit application with non-zero status code
  });
}
