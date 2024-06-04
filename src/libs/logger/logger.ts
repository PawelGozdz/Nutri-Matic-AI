interface ILogger {
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
  success(...args: unknown[]): void;
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

  private log(level: LogLevel, ...args: unknown[]) {
    const icon = `${this.emojiMap[level]} `;
    const output = `${icon}${level}:`;

    const logOutput: any[] = [output];

    const filteredArgs = args?.filter(Boolean);
    if (filteredArgs?.length > 0) logOutput.push(...args);

    if (level === LogLevel.ERROR) {
      console.error(...logOutput);
    } else {
      console.log(...logOutput);
    }
  }

  info(...args: unknown[]) {
    this.log(LogLevel.INFO, ...args);
  }

  warn(...args: unknown[]) {
    this.log(LogLevel.WARN, ...args);
  }

  error(...args: unknown[]) {
    this.log(LogLevel.ERROR, ...args);
  }

  success(...args: unknown[]) {
    this.log(LogLevel.SUCCESS, ...args);
  }
}

export const Logger: ILogger = new ConsoleLogger();
