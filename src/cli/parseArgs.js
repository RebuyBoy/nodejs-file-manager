export function parseUsernameFromArgs() {
  const userArguments = process.argv.slice(2);
  let username = "anonymous";
  const usernameArg = userArguments[0];
  const usernameFlag = "--username";
  if (usernameArg && usernameArg.startsWith(usernameFlag)) {
    username = usernameArg.slice(usernameFlag.length + 1)
  }
  return username;
}

export function parseCommandArgs(args) {
  const userArgs = args.trim();
  const userCommand = userArgs
    .slice(0, userArgs.indexOf(" ") < 0 ? userArgs.length : userArgs.indexOf(" "))
    .toLowerCase()
  const commandArguments = userArgs.slice(userCommand.length).trim().split(" ");
  return {
    command: userCommand,
    arguments: commandArguments
  };
}