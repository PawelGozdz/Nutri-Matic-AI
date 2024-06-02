import { readdirSync, statSync } from "fs";
import { extname, join } from "path";
import { Logger } from "../logger";

export function getFilesInDir(
  dir: string,
  extension?: string | string[]
): string[] {
  try {
    let results: string[] = [];
    const list = readdirSync(dir);

    list.forEach((file) => {
      file = join(dir, file);
      const stat = statSync(file);

      if (stat && stat.isDirectory()) {
        const res = getFilesInDir(file, extension);
        results.push(...res);
      } else if (!extension || matchExtension(extname(file), extension)) {
        results.push(file);
      }
    });

    return results;
  } catch (error: Error | any) {
    if (error.code === "ENOENT") {
      Logger.warn(`Directory not found: ${dir}`);
      return [];
    } else {
      throw error;
    }
  }
}

function matchExtension(
  fileExtension: string,
  extensions: string | string[]
): boolean {
  if (typeof extensions === "string") {
    const match = extensions.match(/{(.*)}/);
    if (match) {
      extensions = match[1].split(",");
    } else {
      extensions = [extensions];
    }
  }

  if (Array.isArray(extensions)) {
    return extensions.includes(fileExtension);
  } else {
    return fileExtension === extensions;
  }
}
