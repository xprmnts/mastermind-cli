const generateSecretCode = require('./bin/generateSecretCode');

// Sample Config
const _defaultAttempts = 10;
const _defaultChoices = 6;
const _defaultPegs = 4;

console.log(generateSecretCode(_defaultPegs, _defaultChoices));
