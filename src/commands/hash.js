import {createHash} from "crypto"
import {open} from "fs/promises"
import {resolve, parse} from "path"
import {checkFilePath} from "../util/fileUtil.js";

export async function getFileHash(workDir, source) {
  const sourcePath = resolve(workDir, source);
  checkFilePath(sourcePath);
  const fileHandle = await open(sourcePath, "r");
  const rs = fileHandle.createReadStream()
  const hash = await _readFileAndCalculateHash(rs);
  const name = parse(source).base;
  return {
    fileName: name,
    fileHash: hash
  };
}

function _readFileAndCalculateHash(readStream) {
  const hash = createHash("sha256");
  return new Promise((resolve, reject) => {
    readStream.on("data", chunk => hash.update(chunk));
    readStream.on("error", err => reject(err));
    readStream.on("end", () => resolve(hash.digest("hex")));
  })
}
