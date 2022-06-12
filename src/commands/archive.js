import {pipeline} from "stream/promises";
import {createBrotliCompress, createBrotliDecompress} from "zlib";
import {resolve} from "path";
import {checkFilePath, resolvePath} from "../util/fileUtil.js";
import {open} from "fs/promises";

export async function compress(workDir, source, destination) {
  let fileHandleSource;
  let fileHandleDest;
  try {
    const sourcePath = resolve(workDir, source);
    checkFilePath(sourcePath);
    const destinationPath = resolvePath(workDir, destination);
    fileHandleSource = await open(sourcePath, "r");
    fileHandleDest = await open(destinationPath, "wx");
    const readStream = fileHandleSource.createReadStream();
    const writeStream = fileHandleDest.createWriteStream();
    const brotli = createBrotliCompress();
    await pipeline(readStream, brotli, writeStream);
  } catch (err) {
    throw new Error(err.message);
  } finally {
    fileHandleSource?.close();
    fileHandleDest?.close();
  }
}

export async function decompress(workDir, source, destination) {
  let fileHandleSource;
  let fileHandleDest;
  try {
    const sourcePath = resolve(workDir, source);
    checkFilePath(sourcePath);
    const destinationPath = resolvePath(workDir, destination);
    fileHandleSource = await open(sourcePath, "r");
    fileHandleDest = await open(destinationPath, "wx");
    const readStream = fileHandleSource.createReadStream();
    const writeStream = fileHandleDest.createWriteStream();
    const brotli = createBrotliDecompress();
    await pipeline(readStream, brotli, writeStream);
  } catch (err) {
    throw new Error(err.message);
  } finally {
    fileHandleSource?.close();
    fileHandleDest?.close();
  }
}

