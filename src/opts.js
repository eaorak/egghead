const commandLineArgs = require("command-line-args");
const usage = require("command-line-usage");
var env = require("node-env-file");

const optionDefinitions = [
  { name: "username", alias: "u", type: String },
  { name: "password", alias: "p", type: String },
  { name: "course", alias: "c", type: String, defaultOption: true }
];

const sections = [
  {
    header: "Egghead downloader",
    content: "Download Egghead videos."
  },
  {
    header: "Options",
    optionList: [
      {
        name: "username",
        alias: "u",
        typeLabel: "{underline e-mail}",
        description: "Egghead Pro username."
      },
      {
        name: "password",
        alias: "p",
        typeLabel: "{underline pass}",
        description: "Egghead Pro password."
      },
      {
        name: "course",
        alias: "p",
        typeLabel: "{underline course-name}",
        description: "Course name (as-in-the-url)."
      },
      {
        name: "help",
        alias: "h",
        description: "Print this usage guide."
      }
    ]
  }
];

console.log(__dirname);
env(__dirname + "/../.env");

function getArgs() {
  const username = process.env.username;
  const password = process.env.password;

  const args = { username, password, ...commandLineArgs(optionDefinitions) };
  console.log(` > Username: ${username}`);

  if (!args || Object.keys(args).length === 0) {
    console.log("No parameters provided. Usage:");
    console.log(usage(sections));
    process.exit(1);
  }
  return args;
}

module.exports = getArgs;
