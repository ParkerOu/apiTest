module.exports = {
    extends: ['google', 'plugin:import/errors', 'plugin:import/warnings'],
    env: {
        node: true,
        browser: true,
    },
    parser: 'babel-eslint',
    rules: {
        'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
        'object-curly-newline': [
            'error',
            {
                ImportDeclaration: { minProperties: 2 },
                ObjectExpression: { minProperties: 2 },
                ObjectPattern: { minProperties: 2 },
            },
        ],
        'brace-style': 'error',
        indent: [
            'error',
            4,
            {
                CallExpression: { arguments: 'first' },
                ArrayExpression: 1,
                ObjectExpression: 1,
                SwitchCase: 1,
            },
        ],
        'space-before-blocks': 'error',
        'space-before-function-paren': 'error',
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': 'error',
        'for-direction': 'error',
        'getter-return': [
            'error',
            {
                allowImplicit: false,
            },
        ],
        'implicit-arrow-linebreak': ['error', 'beside'],
        'block-spacing': 'error',
        'arrow-spacing': 'error',
        'arrow-parens': ['error', 'always'],
        'no-compare-neg-zero': 2,
        'no-constant-condition': [
            'error',
            {
                checkLoops: false,
            },
        ],
        'new-cap': [
            'error',
            {
                capIsNew: false,
            },
        ],
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-dupe-args': 'error',
        'no-dupe-keys': 'error',
        // 'no-console': 'off',
        'no-undef': 'error',
        'linebreak-style': 0,
        'max-len': [
            'error',
            {
                code: 120,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreStrings: true,
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
            },
        ],
    },
    "globals": {
    }
};