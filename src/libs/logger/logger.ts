interface ILogger {
  info(message: string, obj?: object | unknown, noIcon?: boolean): void;
  warn(message: string, obj?: object | unknown, noIcon?: boolean): void;
  error(message: string, obj?: object | unknown, noIcon?: boolean): void;
  success(message: string, obj?: object | unknown, noIcon?: boolean): void;
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

  private log(
    level: LogLevel,
    message: string,
    obj?: object | unknown,
    noIcon?: boolean
  ) {
    const icon = noIcon ? "" : `${this.emojiMap[level]} `;
    const output = `${icon}${level}: ${message}`;
    let objOutput: object | unknown;

    if (obj && typeof obj === "object") {
      objOutput = obj;
    }

    const logOutput = [output] as any | any[];
    if (objOutput) logOutput.push(objOutput as object);

    if (level === LogLevel.ERROR) {
      console.error(...logOutput);
    } else {
      console.log(...logOutput);
    }
  }

  info(message: string, obj?: object | unknown, noIcon?: boolean) {
    this.log(LogLevel.INFO, message, obj, noIcon);
  }

  warn(message: string, obj?: object | unknown, noIcon?: boolean) {
    this.log(LogLevel.WARN, message, obj, noIcon);
  }

  error(message: string, obj?: object | unknown, noIcon?: boolean) {
    this.log(LogLevel.ERROR, message, obj, noIcon);
  }

  success(message: string, obj?: object | unknown, noIcon?: boolean) {
    this.log(LogLevel.SUCCESS, message, obj, noIcon);
  }
}

export const Logger: ILogger = new ConsoleLogger();
