interface ILogger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  success(message: string, ...args: unknown[]): void;
}

enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

class ConsoleLogger implements ILogger {
  private emojiMap: { [key in LogLevel]: string } = {
    [LogLevel.INFO]: "🛈",
    [LogLevel.WARN]: "⚠️",
    [LogLevel.ERROR]: "❌",
    [LogLevel.SUCCESS]: "✅",
  };

  private log(level: LogLevel, message: string, ...args: unknown[]) {
    const icon = `${this.emojiMap[level]} `;
    const output = `${icon}${level}: ${message}`;

    const logOutput: any[] = [output];

    const filteredArgs = args?.filter(Boolean);
    if (filteredArgs?.length > 0) logOutput.push(...args);

    if (level === LogLevel.ERROR) {
      console.error(...logOutput);
    } else {
      console.log(...logOutput);
    }
  }

  info(message: string, ...args: unknown[]) {
    this.log(LogLevel.INFO, message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    this.log(LogLevel.WARN, message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    this.log(LogLevel.ERROR, message, ...args);
  }

  success(message: string, ...args: unknown[]) {
    this.log(LogLevel.SUCCESS, message, ...args);
  }
}

export const Logger: ILogger = new ConsoleLogger();
