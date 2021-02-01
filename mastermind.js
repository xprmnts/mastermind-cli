/*
 * Packages
 */
const inquirer = require('inquirer');
const generateSecretCode = require('./bin/generateSecretCode');

// Sample Config
const _defaultAttempts = 10;
const _defaultChoices = 6;
const _defaultPegs = 4;

const _history = [];

const question = [
    {
        type: 'string',
        name: 'guess',
        message: 'enter a code sequence'
    }
];

const secret = generateSecretCode(_defaultPegs, _defaultChoices);

function game() {
    inquirer.prompt(question).then(answers => {
        let playerGuess = answers.guess;
        // Store Guess
        _history.push(playerGuess);

        // Check Guess
        if (playerGuess === '1234') {
            // Game Over
            // Draw Table
            console.log('Game Over');
        } else if (playerGuess === '4321') {
            // Partial Match
            // Draw Table
            console.log('Partial Matches or No Matches');
            game();
        } else {
            // No Matches
            // Draw Table
            console.log('Out of tries');
        }
    });

    //
}

game();
