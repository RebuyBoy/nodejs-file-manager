import {join} from "path";
import {readdirSync} from "fs";
import {checkDirPath, resolvePath} from "../util/fileUtil.js"

export function up(currentPath) {
  return join(currentPath, "..");
}

export function cd(workingDirectory, destination) {
  const path = resolvePath(workingDirectory, destination)
  checkDirPath(path);
  return path;
}

export function ls(currentPath) {
  return readdirSync(currentPath);
}




