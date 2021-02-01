/**
 * Randomly generates and returns an array of digits between 0 & choices configured for the game.
 */

const generateSecretCode = (pegs, choices) => {
    const secretCode = Array(pegs).fill(null);

    for (let peg of secretCode) {
        const index = secretCode.indexOf(peg);

        secretCode[index] = Math.floor(Math.random() * Math.floor(choices));
    }

    return secretCode;
};

module.exports = generateSecretCode;
