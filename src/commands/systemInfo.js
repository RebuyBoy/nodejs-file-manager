import {cpus, EOL, homedir, userInfo, arch} from "os";

export function getOSInfo(flag) {
  switch (flag.toLowerCase()) {
    case "--eol":
      return _getEOL();
    case "--cpus":
      return _getCpuInfo();
    case "--homedir":
      return _getHomeDirectory();
    case "--username":
      return _getSystemUsername();
    case "--architecture":
      return _getArch();
    default:
      throw new Error("wrong flag")
  }
}

function _getEOL() {
  return JSON.stringify(EOL);
}
//TODO +10 Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
function _getCpuInfo() {
  return cpus();
}

function _getHomeDirectory() {
  return homedir();
}

function _getSystemUsername() {
  return userInfo().username;
}

function _getArch() {
  return arch();
}

