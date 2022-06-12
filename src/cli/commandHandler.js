import {getFileHash} from "../commands/hash.js"
import {up, ls, cd} from "../commands/navigation.js"
import {getOSInfo} from "../commands/systemInfo.js"
import {compress, decompress} from "../commands/archive.js"
import {
  readFile,
  deleteFile,
  copyFile,
  createFile,
  moveFile,
  renameFile
} from "../commands/basic.js"

const _commandsMap = getCommands();
const successMessage = "operation was successful\n";

function _handleOsInfo(flag) {
  const osInfo = getOSInfo(flag);
  printMessage(osInfo);
}

function getCommands() {
  return new Map(Object.entries({
    up: () => _handleUp(),
    ls: () => _handleLs(),
    cd: (destination) => _handleCd(destination),
    cat: (source) => _handleReadFile(source),
    add: (destination) => _handleCreateFile(destination),
    rn: (source, destination) => _handleRenameFile(source, destination),
    cp: (source, destination) => _handleCopyFile(source, destination),
    mv: (source, destination) => _handleMoveFile(source, destination),
    rm: (source) => _handleDeleteFile(source),
    hash: (source) => _handleGetHash(source),
    compress: (source, destination) => _handleCompress(source, destination),
    decompress: (source, destination) => _handleDecompress(source, destination),
    os: (flag) => _handleOsInfo(flag),
  }));
}

export function getCommand(command) {
  return _commandsMap.get(command);
}

function printMessage(message) {
  console.log(message);
}

function _handleUp() {
  process.curDir = up(process.curDir);
}

function _handleLs() {
  const filesArr = ls(process.curDir);
  printMessage(filesArr);
}

function _handleCd(destination) {
  process.curDir = cd(process.curDir, destination)
}

async function _handleReadFile(source) {
  const fileContent = await readFile(process.curDir, source);
  if (fileContent) {
    printMessage(fileContent);
  }
}

async function _handleRenameFile(source, destination) {
  await renameFile(process.curDir, source, destination);
  printMessage(successMessage);
}

async function _handleCopyFile(source, destination) {
  await copyFile(process.curDir, source, destination);
  printMessage(successMessage);
}

async function _handleMoveFile(source, destination) {
  await moveFile(process.curDir, source, destination);
  printMessage(successMessage);
}

async function _handleDeleteFile(source) {
  await deleteFile(process.curDir, source);
  printMessage(successMessage);
}

async function _handleCreateFile(destination) {
  await createFile(process.curDir, destination);
  printMessage(successMessage);
}

async function _handleGetHash(source) {
  const hash = await getFileHash(process.curDir, source);
  printMessage(`Hash for file ${hash.fileName}: ${hash.fileHash}`);
}

async function _handleCompress(source, destination) {
  compress(process.curDir, source, destination);
  printMessage(successMessage);
}

async function _handleDecompress(source, destination) {
  decompress(process.curDir, source, destination);
  printMessage(successMessage);
}
