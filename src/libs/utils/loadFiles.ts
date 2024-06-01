import path from "path";
import { fileURLToPath } from "url";
import { getFilesInDir } from "./getFilesInDir";

interface LoadFilesOpts {
  dir: string;
}

export async function loadFiles<T extends LoadFilesOpts>(pattern: string, options: T): Promise<Array<any>> {
  const commandsDir = path.isAbsolute(options.dir)
    ? options.dir
    : path.join(__dirname, options.dir);

  const files = getFilesInDir(commandsDir, pattern);

  const returnFiles = [];

  for (const filePath of files) {
    const fileUrl = new URL(`file://${filePath}`);

    const file = await import(fileURLToPath(fileUrl));

    returnFiles.push(file);
  }

  return returnFiles;
}