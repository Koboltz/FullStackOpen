module.exports = {
    'plugins': [
        'react'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'env' : {
        'browser' : true,
        'node' : true,
        'es6' : true
    },
    'rules': {
        'react/no-set-state': 'off',
        // enable additional rules
        'indent': ['error', 4],
        'linebreak-style': ['error', 'windows'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],

        // override configuration set by extending "eslint:recommended"
        'no-empty': 'warn',
        'no-cond-assign': ['error', 'always'],
        'sourceType': 0,
        

        // disable rules from base configurations
        'for-direction': 'off',
        "react/react-in-jsx-scope": "off",
    },
    'parserOptions': {
        'sourceType': 'module',
        "ecmaVersion": 8,
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    }
}