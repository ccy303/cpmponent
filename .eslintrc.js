//安装  eslint-plugin-import
module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: ["eslint:recommended"],
    // parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        semi: ["error", "always"],
        "space-before-blocks": ["error", "always"],
        "keyword-spacing": ["error", { before: true }],
        "space-infix-ops": ["error", { int32Hint: false }],
        "eol-last": ["error", "always"],
        "padded-blocks": ["error", "never"],
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "array-bracket-spacing": ["error", "never"],
        "object-curly-spacing": ["error", "always"],
        "max-len": ["off"], // 最长行内字数
        "block-spacing": ["error", "always"],
        "comma-spacing": ["error", { before: false, after: true }],
        "computed-property-spacing": ["error", "never"],
        "func-call-spacing": ["error", "never"],
        "key-spacing": ["error", { beforeColon: false }],
        "no-trailing-spaces": "error",
        "comma-style": ["error", "last"],
        "comma-dangle": ["error", "never"],
        // "id-length": ["error", { min: 2 }], // 最小变量命名字母数
        // camelcase: ["error", { properties: "never" }], // 小驼峰命名
        "new-cap": ["error", { newIsCap: true, capIsNew: false }],
        "prefer-const": [
            "error",
            {
                destructuring: "any",
                ignoreReadBeforeAssign: false
            }
        ],
        "no-const-assign": "error",
        "no-var": "error",
        "quote-props": ["error", "as-needed"],
        "prefer-destructuring": ["error", { object: true, array: true }],
        quotes: ["off"],
        "prefer-template": "error",
        "no-eval": "error",
        "no-useless-escape": "error",
        "wrap-iife": ["error", "inside"],
        "prefer-rest-params": "error",
        "no-new-func": "error",
        "space-before-blocks": "error",
        "no-param-reassign": "error",
        "prefer-spread": "error",
        "no-useless-constructor": "error",
        "no-dupe-class-members": "error",
        "no-duplicate-imports": "error",
        "no-undef": "error",
        "prefer-const": "error",
        "one-var": ["error", "never"],
        "no-multi-assign": "error",
        "no-case-declarations": "error",
        "no-unneeded-ternary": "error",
        "nonblock-statement-body-position": ["error", "beside"],
        "brace-style": "error",
        "spaced-comment": ["error", "always"],
        "no-multi-spaces": "error",
        "no-unused-vars": ["off"],
        "comma-dangle": ["off"],
        "no-extra-boolean-cast": ["off"],
        "no-param-reassign": ["off"],
        "no-unsafe-optional-chaining": ["off"],
        "no-async-promise-executor": ["off"],
        "prefer-const": ["off"],
        "no-unreachable": ["off"]
    }
};
