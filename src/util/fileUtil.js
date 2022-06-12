import {existsSync, statSync} from "fs";
import {resolve} from "path";

export function isExists(path) {
  return existsSync(path);
}

export function checkDirPath(path) {
  if (!isExists(path)) {
    throw new Error("Path is not exists");
  }
  if (!_isDirectory(path)) {
    throw new Error("Is not a directory");
  }
  return true;
}

export function checkFilePath(path) {
  if (!isExists(path)) {
    throw new Error("Path is not exists");
  }
  if (!_isFile(path)) {
    throw new Error("Is not a file");
  }
  return true;
}

export function _isDirectory(path) {
  const stats = statSync(path);
  return stats.isDirectory();
}

export function _isFile(path) {
  const stats = statSync(path);
  return stats.isFile();
}

export function resolvePath(workingDirectory, destination) {
  return resolve(workingDirectory, destination);
}
