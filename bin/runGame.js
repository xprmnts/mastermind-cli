const chalk = require('chalk'); // to make the table & console pretty
const inquirer = require('inquirer');
const { table } = require('table'); // to render table
const generateSecretCode = require('./generateSecretCode');
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

const question = [
    {
        type: 'string',
        name: 'guess',
        message: 'enter a 4 digit code sequence',
        required: true,
        validate: function (value) {
            let pass = value.match(/^[1-6]{4}$/);
            if (pass) {
                return true;
            }

            return 'Please enter a valid sequence of 4 digits between 1 & 6 inclusive.';
        }
    }
];

const secret = generateSecretCode(_defaultPegs, _defaultChoices);

let attempts = _defaultAttempts;

function runGame() {
    // Show Table
    output = table(data, config);
    console.clear();
    console.log(output);

    if (attempts > 0) {
        // Draw Table
        inquirer.prompt(question).then(answers => {
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
                attempts < 4 ? chalk.bgRed.bold(attempts) : attempts
            ]);

            if (success) {
                console.log('Game Over: You cracked the code!');
            } else {
                runGame();
            }
        });
    } else {
        console.log('You ran out of attempts!');
        console.log(`The code was ${secret}`);
    }
}

module.exports = runGame;
