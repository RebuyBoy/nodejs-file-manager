import {parseUsernameFromArgs, parseCommandArgs} from "./parseArgs.js"
import {homedir} from "os";
import {getCommand} from "./commandHandler.js"

const stdin = process.stdin;
const stdout = process.stdout;
const username = parseUsernameFromArgs();
const incorrectUserCommandMessage = "Wrong command\nFor list of commands use: commands\n";
const unsuccessfulOperation = "operation failed";
const exitFLag = ".exit";

export function start() {
  process.curDir = homedir();
  stdout.write(_generateWelcomeMessage(username));
  stdout.write(_generateCurrentPathMessage(process.curDir));
  stdin.setEncoding("utf-8");
  stdin.on('data', _handleInputV2);
  process.on('SIGINT', _exit);
}

async function _handleInputV2(userCommand) {
  try {
    const userCommandArgs = parseCommandArgs(userCommand);
    const command = userCommandArgs.command;
    const commandFunction = getCommand(command);
    const commandArguments = userCommandArgs.arguments;
    if (command === exitFLag) {
      _exit();
    }
    if (!commandFunction) {
      stdout.write(incorrectUserCommandMessage);
    } else {
      await commandFunction.apply(null, commandArguments);
    }
  } catch (err) {
    stdout.write(`${unsuccessfulOperation} (${err.message})\n`);
  }
  stdout.write(_generateCurrentPathMessage(process.curDir))
}

function _generateWelcomeMessage(name) {
  return `Welcome to the File Manager, ${name}\n`;
}

function _generateCurrentPathMessage(path) {
  return `You are currently in ${path}\n`;
}

function _generateExitMessage(name) {
  return `\nThank you for using File Manager, ${name}\n`;
}

function _exit() {
  stdout.write(_generateExitMessage(username));
  process.exit();
}
