/*
 * Packages
 */
const inquirer = require('inquirer'); // to get user prompts
const { table } = require('table'); // to render table
const chalk = require('chalk'); // to make the table & console pretty
const generateSecretCode = require('./bin/generateSecretCode');
const validateGuess = require('./validateGuess');

// Sample Config
const _defaultAttempts = 10;
const _defaultChoices = 6;
const _defaultPegs = 4;

let data, config, output;

data = [
    [
        chalk.bold('Guess'),
        chalk.bold('Exact Matches'),
        chalk.bold('Partial Matches'),
        chalk.bold('Attempts Remaining')
    ]
];

const validateInput = answers => {};

//TODO: Pattern Matching to Get Valid Guess
const question = [
    {
        type: 'number',
        name: 'guess',
        msg: 'enter a code sequence',
        required: true,
        type: 'string'
    }
];

// const secret = generateSecretCode(_defaultPegs, _defaultChoices);
const secret = [2, 1, 2, 2];
let attempts = _defaultAttempts;

function game() {
    // Show Table
    output = table(data, config);
    console.log(output);

    if (attempts > 0) {
        // Draw Table
        inquirer.prompt(question).then(answers => {
            let re = new RegExp(/^[0-9]{4}$/);
            if (!answers.guess.match(re)) {
                console.log('Invalid Input, Try again');
                game();
            } else {
                attempts--;
                let playerGuess = answers.guess;
                // Check Guess
                const {
                    success,
                    exactMatchCount,
                    partialMatchCount
                } = validateGuess(playerGuess, secret);

                // Store Guess
                data.push([
                    playerGuess,
                    exactMatchCount > 0
                        ? chalk.red.bold(exactMatchCount)
                        : exactMatchCount,
                    partialMatchCount > 0
                        ? chalk.white.bold(partialMatchCount)
                        : partialMatchCount,
                    attempts < 2 ? chalk.bgRed.bold(attempts) : attempts
                ]);

                if (success) {
                    console.log('Game Over: You cracked the code!');
                } else {
                    game();
                }
            }
        });
    } else {
        console.log('You ran out of attempts!');
        console.log(`The code was ${secret}`);
    }
}

game();
