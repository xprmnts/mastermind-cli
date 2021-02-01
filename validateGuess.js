// Takes player guess and secret code as input
// returns boolean for complete match, and a number for exact and a number for partial matches

const validateGuess = (guess, code) => {
    let codeMap = Array(code.length).fill(null);
    let guessMap = Array(code.length).fill(null);

    // split guess & convert to number
    let guessArray = guess.split('').map(x => +x);

    for (let i = 0; i < guessArray.length; i++) {
        if (guessArray[i] === code[i]) {
            codeMap[i] = 'E';
            guessMap[i] = 'E';
        }
    }

    for (let i = 0; i < guessArray.length; i++) {
        if (!guessMap[i]) {
            for (let j = 0; j < code.length; j++) {
                if (!codeMap[j] && !guessMap[i]) {
                    if (guessArray[i] === code[j]) {
                        codeMap[j] = 'P';
                        guessMap[i] = 'P';
                    }
                }
            }
        }
    }

    const success = codeMap.every(element => element === 'E');

    const exactMatchCount = codeMap.reduce((total, element) => {
        return element === 'E' ? total + 1 : total + 0;
    }, 0);

    const partialMatchCount = codeMap.reduce((total, element) => {
        return element === 'P' ? total + 1 : total + 0;
    }, 0);

    return {
        success,
        exactMatchCount,
        partialMatchCount
    };
};

module.exports = validateGuess;
