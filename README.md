# Mastermind Game

The classic [mastermind](https://en.wikipedia.org/wiki/Mastermind_%28board_game%29) game in command line form running on Node.

# Setup Instructions

```
git clone git@github.com:xprmnts/mastermind-cli.git
cd mastermind-cli
npm install
node mastermind.js
```

# Game Instructions

As the Codemaker: the computer will set a mystery code that will try to keep you guessing for as long as possible.
As the Decoder: you must break the secret code in the fewest number of guesses.

### Gameplay Instructions

1. The code is 4 digits long.
2. There are 6 possible values per digit.
3. You will have 10 attempts as the decoder to try to guess the code.

### Next / Upcoming

1. Configurable Code Length
2. Configurable Number of Choices per Peg
3. Configure repeats
4. Configure Allowed Attempts
5. Configure Allowed Time
