import { spawn } from "child_process";
import { Logger } from "../libs";

export function errorHandling() {
  process.on("uncaughtException", (error) => {
    Logger.error("Uncaught exception:", error);
    // restartApplication();
  });

  process.on("unhandledRejection", (_reason, promise) => {
    Logger.error("Unhandled Rejection at:", promise);
    // restartApplication();
  });
}

function restartApplication() {
  // Spawn a new instance of the application
  const newProcess = spawn(process.argv[0], process.argv.slice(1), {
    detached: true,
    stdio: "inherit",
  });

  // Exit the current process
  process.exit(1);
}
