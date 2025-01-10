#!/usr/bin/env node

const { exec } = require('child_process');
const { generateCommitName } = require('./generator');
const chalk = require('chalk');
const inquirer = require('inquirer');

const prompt = inquirer.createPromptModule()

exec('git diff', async (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing git diff: ${error.message}`);
        return;
    }
    const message = await generateCommitName(stdout.slice(0, 100000));
    console.log(`Commit message is generated : ${chalk.green(message)}`);
    exec('git status -s', (err, status, stdout) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(chalk.grey(status));
        prompt([{
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to continue ?',
            default: true
        }]).then((ans) => {
            if (ans.continue) {
                try {
                    exec(`git add . && git commit -m "${message}" && git push`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            console.error(`Stderr: ${stderr}`);
                        }
                        console.log(`Output: ${stdout}`);
                    });
                } catch (e) {
                    console.log(chalk.red(e));
                }
            }
        });
    });
});
