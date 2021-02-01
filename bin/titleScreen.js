const chalk = require('chalk'); // to make the table & console pretty
const CFonts = require('cfonts');
const inquirer = require('inquirer');
const runGame = require('./runGame');
/*
 * Title Screen
 */

const showTitleScreen = () => {
    CFonts.say('Mastermind', {
        font: 'block', // define the font face
        align: 'left', // define text alignment
        background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1, // define letter spacing
        lineHeight: 1, // define the line height
        space: true, // define if the output text should have empty lines on top and on the bottom
        maxLength: '0', // define how many character can be on one line
        gradient: 'red,blue', // define your two gradient colors
        independentGradient: false, // define if you want to recalculate the gradient for each new line
        transitionGradient: false, // define if this is a transition between colors directly
        env: 'node' // define the environment CFonts is being executed in
    });

    /*
     * Game Instructions
     */
    console.log(
        'As the Codemaker: the computer will set a mystery code that will try to keep you guessing for as long as possible.'
    );
    console.log(
        'As the Decoder: you must break the secret code in the fewest number of guesses.\n\n'
    );
    console.log(chalk.bold.blue('Instructions'));
    console.log(
        '1. The code is 4 digits long. Enter a contiguous sequence of digits. \n2. There are 6 possible values per digit. Each digit must be between 1-6 (inclusive). \n3. You will have 10 attempts as the decoder to try to guess the code.\n\n\n'
    );

    /*
     * Game Start Prompts
     */

    const gameStartConfig = [
        {
            type: 'confirm',
            name: 'start',
            message: 'Would you like to start a game?',
            default: true
        }
    ];

    inquirer.prompt(gameStartConfig).then(answers => {
        if (answers.start) {
            runGame();
        }
    });
};

module.exports = showTitleScreen;
