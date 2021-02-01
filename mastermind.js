/*
 * Packages
 */
const inquirer = require('inquirer');
const generateSecretCode = require('./bin/generateSecretCode');
const validateGuess = require('./validateGuess');

// Sample Config
const _defaultAttempts = 3;
const _defaultChoices = 6;
const _defaultPegs = 4;

const _history = [];

//TODO: Pattern Matching to Get Valid Guess
const question = [
    {
        type: 'string',
        name: 'guess',
        message: 'enter a code sequence'
    }
];

// const secret = generateSecretCode(_defaultPegs, _defaultChoices);
const secret = [2, 1, 2, 2];
let attempts = _defaultAttempts;

function game() {
    if (attempts > 0) {
        inquirer.prompt(question).then(answers => {
            attempts--;
            let playerGuess = answers.guess;
            // Store Guess
            _history.push(playerGuess);
            // Check Guess
            const {
                codeMatch,
                exactMatchCount,
                partialMatchCount
            } = validateGuess(playerGuess, secret);

            console.log(codeMatch, exactMatchCount, partialMatchCount);

            if (codeMatch) {
                // Game Over
                // Draw Table
                console.log(_history);
                console.log('Game Over');
            } else {
                // Partial Match
                // Draw Table
                // console.log(_history);
                // console.log(secret);
                console.log('Partial Matches or No Matches');

                game();
            }
        });
    } else {
        console.log('You ran out of attempts!');
    }
}

game();
