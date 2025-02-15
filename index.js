#!/usr/bin/env node

const inquirer = require("inquirer");
const { Command } = require("commander");
const { config } = require("dotenv");
const chalk = require("chalk");


config();

const { makeCommit } = require("./commit.js");
const { makeReadme } = require("./readme.js");

const program = new Command();

process.on('SIGINT', function () {
    process.exit(0);
});

program
    .name('doxs')
    .description("CLI tool for generating README and making perfect commits")
    .version('1.0.0')

program
    .option("-k, --key <key>", "Groq API Key")
    .parse(process.argv)

const prompt = inquirer.createPromptModule();

const options = program.opts();

if (!process.env.GROQ_API_KEY && options.key == undefined) {
    console.log(chalk.red("API key is not present , please add GROQ_API_KEY in your .env file"));
    return;
}

if (options.key && !options.key.includes("gsk_")) {
    console.log(chalk.red("API key is invalid"));
    return;
}

prompt([
    {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: ["Generate README", "Make a Commit"],
    },
]).then((answers) => {
    if (answers.action === "Generate README") {
        makeReadme(options.key);
    } else if (answers.action === "Make a Commit") {
        makeCommit(options.key);
    }
}).catch(e => {
    console.log(e.message)
});

