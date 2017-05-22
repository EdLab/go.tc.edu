module.exports = {
    "globals": {
        Logger: true
    },
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "plugins": [
        "mocha"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "mocha/no-exclusive-tests": "error"
    }
};
