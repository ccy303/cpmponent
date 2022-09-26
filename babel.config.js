const path = require("path");
module.exports = function (api) {
    api.cache(true);
    const presets = [
        "@babel/react",
        [
            "@babel/preset-env",
            {
                targets: {
                    ie: 11
                },
                useBuiltIns: "usage",
                corejs: { version: 3.25, proposals: true }
            }
        ]
    ];
    const plugins = [
        [
            "import",
            {
                libraryName: "antd",
                style: true
            },
            "antd"
        ]
    ];
    const ignore = [
        filename => {
            return !/(.*src.*).(js|jsx|ts|tsx)| (.*(\n|n)ode_modules.*(react.*|antd.*|copy-anything|is-what).*(\.js)$)/.test(
                filename
            );
            // return !/^(((?!node_modules).)*(js|jsx|ts|tsx))|(.*(node_modules).*().*(\.js)$)/.test(filename);
        }
    ];
    return {
        presets,
        plugins,
        ignore,
        sourceType: "unambiguous"
    };
};
