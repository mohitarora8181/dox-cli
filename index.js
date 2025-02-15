#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { generateReadme } = require("./generator.js");
const { Command } = require("commander");
const { analyzeFolder } = require("./analyze.js");

const program = new Command();

program
    .version('1.0.0')
    .option('-i, --include <number>', "File path for include content in prompt.")
    .parse(process.argv);

const prompt = inquirer.createPromptModule();

prompt(
    [{
        type: "input",
        name: "title",
        message: `Title of the project : (required) `,
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
        message: "Enter the description of your project : (skip -> Enter) "
    },
    {
        type: "input",
        name: "feature",
        message: "Enter some features of your project : (skip -> Enter)",
    }]
).then(async (ans) => {
    const content = `Generate a well-structured README.md file for a project using the following metadata: 
    ${analyzeFolder("./")}. 

    Include sections: 
    1) Project Title & Description, 
    2) Table of Contents, 
    3) Installation Instructions, 
    4) Usage Guide, 
    5) Project Structure, 
    6) API Documentation (if applicable), 
    7) Key Features, 
    8) Environment Variables, 
    9) Contributing Guidelines, 
    10) License. 

    Title of the project : ${ans.title} , description ( if available ) : ${ans.description} , Features ( if available ) : ${ans.feature} ,
    
    Use Markdown syntax properly, include code blocks for commands, structured tables for API endpoints, and a markdown-friendly project tree diagram. Ensure readability and clarity.`

    if (await generateReadme(content)) {
        console.log(chalk.green("Readme Created"));
    }
}).catch(e => {
    console.log(e.message)
});