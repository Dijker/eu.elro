module.exports = {
    "plugins": ["node"],
    "extends": [
        "airbnb-base",
        "plugin:node/recommended"
    ],
    "rules": {
        "node/exports-style": ["error", "module.exports"],
        "no-underscore-dangle": "off",
        "max-len": ["warn", {
            "code": 300
        }],
        "consistent-return": "off",
        "no-param-reassign": ["warn"],
        "no-await-in-loop": "off",
        "no-empty": "off",
        "no-plusplus": "off",
        "no-shadow": "off",
        "no-process-exit": "off",
        "arrow-parens": "off",
        "arrow-body-style": "off",
        "curly": "off",
        "prefer-destructuring": "off",
        "node/no-missing-require": ["error", {
            "allowModules": ["homey"]
        }],
        "import/no-unresolved": [
            "error", {
                "ignore": ["homey"]
            }
        ],
        "no-prototype-builtins": "off",
        "no-case-declarations": "off",
        "class-methods-use-this": "off"
    },
    "parserOptions": {
        "sourceType": "script"
    }
};
