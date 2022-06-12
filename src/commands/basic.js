import {checkDirPath, checkFilePath} from "../util/fileUtil.js";
import {open, rename, unlink} from "fs/promises"
import {resolve, dirname, parse} from "path";

export async function readFile(workDir, filePath) {
  const path = resolve(workDir, filePath);
  checkFilePath(path);
  try {
    const fileHandle = await open(path, "r");
    const rs = fileHandle.createReadStream();
    return _streamToString(rs);
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createFile(workDir, filePath) {
  try {
    const path = resolve(workDir, filePath);
    await open(path, "wx");
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function renameFile(workDir, source, newName) {
  try {
    const sourcePath = resolve(workDir, source);
    checkFilePath(sourcePath);
    const sourceDirname = dirname(sourcePath);
    const newNamePath = resolve(sourceDirname, newName);
    return rename(sourcePath, newNamePath);
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function copyFile(workDir, source, destination) {
  let fileHandleSource;
  let fileHandleDest;
  try {
    const sourcePath = resolve(workDir, source);
    checkFilePath(sourcePath);
    checkDirPath(destination);
    const filenameDest = _addCopyToName(sourcePath);
    const destinationPath = resolve(workDir, destination, filenameDest);
    fileHandleSource = await open(sourcePath, "r");
    fileHandleDest = await open(destinationPath, "wx");
    const rs = fileHandleSource.createReadStream();
    const ws = fileHandleDest.createWriteStream();
    rs.pipe(ws);
  } catch (err) {
    throw new Error(err.message);
  } finally {
    await fileHandleSource?.close();
    await fileHandleDest?.close();
  }
}

export async function moveFile(workDir, source, destination) {
  try {
    await copyFile(workDir, source, destination);
    return deleteFile(workDir, source);
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteFile(workDir, source) {
  try {
    const sourcePath = resolve(workDir, source);
    checkFilePath(sourcePath);
    return unlink(sourcePath);
  } catch (err) {
    throw new Error(err.message);
  }
}

const _streamToString = (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
};

function _addCopyToName(path) {
  const {name, ext} = parse(path);
  return `${name}-copy${ext}`;
}
