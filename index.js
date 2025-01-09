#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const inquirer = require("inquirer");
const { generateReadme } = require("./generator.js");
const { Command } = require("commander")

const program = new Command();

program
    .version('1.0.0')
    .option('-i, --include <number>', "File path for include content in prompt.")
    .parse(process.argv);

const prompt = inquirer.createPromptModule();
const params = program.opts();

let content = "";
let codefile = "";

if (params?.include) {
    if (fs.existsSync(params.include)) {
        const dt = fs.readFileSync(params?.include, 'utf-8');
        codefile = `Please include this code file in cosideration , ${dt} ,`
    } else {
        console.log(chalk.red("-i , Path is not defined"));
    }
}

prompt(
    [{
        type: "input",
        name: "title",
        message: `Title of the project : `,
        validate: (input) => {
            if (input.trim() === '') {
                return 'Title cannot be empty!';
            }
            return true;
        },
    },
    {
        type: "input",
        name: "description",
        message: "Enter the description of your project : ",
        validate: (input) => {
            if (input.trim() === '') {
                return 'Description cannot be empty!';
            }
            return true;
        }
    },
    {
        type: "input",
        name: "feature",
        message: "Enter some features of your project : ",
        validate: (input) => {
            if (input.trim() === '') {
                return 'Features cannot be empty!';
            }
            return true;
        }
    }]
).then(async (ans) => {
    content += `project title is ${ans.title}  , description is ${ans.description} and features are ${ans.feature}.`
    if (await generateReadme(content,codefile)) {
        console.log(chalk.green("Readme Created"));
    }
});