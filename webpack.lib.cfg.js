const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const handler = (percentage, message, ...args) => {
    console.info(`${(percentage * 100).toFixed(2)}%`, message, ...args);
};
module.exports = {
    mode: "production",
    target: ["web", "es5"],
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "./lib"), // 出口目录，dist文件
        publicPath: "/",
        filename: "[name].js",
        library: "LCompoments",
        libraryTarget: "umd"
    },
    // devtool: "cheap-module-source-map",
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "ReactDOM"
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            // "style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        localIdentName: "[local]-[hash:base64:10]",
                                        getLocalIdent: (context, localIdentName, localName) => {
                                            const path = context._module.context;
                                            if (
                                                /^((?!node_modules).)*(src){1}.*(components){1}.*$/.test(
                                                    path
                                                )
                                            ) {
                                                return;
                                            } else {
                                                return localName;
                                            }
                                        }
                                    }
                                }
                            },
                            "postcss-loader"
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            // "style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        localIdentName: "[local]-[hash:base64:10]",
                                        getLocalIdent: (context, localIdentName, localName) => {
                                            const path = context._module.context;
                                            if (
                                                /^((?!node_modules).)*(src){1}.*(components){1}.*$/.test(
                                                    path
                                                )
                                            ) {
                                                return;
                                            } else {
                                                return localName;
                                            }
                                        }
                                    }
                                }
                            },
                            "postcss-loader",
                            {
                                loader: "less-loader", // compiles Less to CSS
                                options: {
                                    lessOptions: {
                                        modifyVars: {
                                            "primary-color": "#d7000f",
                                            "link-color": "#d7000f",
                                            "ant-prefix": "linkfin",
                                            "menu-item-height": "48px",
                                            "menu-inline-submenu-bg": "#fff",
                                            "menu-inline-toplevel-item-height": "48px",
                                            "menu-dark-highlight-color": "#fff",
                                            "menu-dark-bg": "#13131c",
                                            "menu-dark-selected-item-text-color": "#0000ff"
                                        },
                                        javascriptEnabled: true
                                    }
                                }
                            },
                            {
                                loader: "style-resources-loader",
                                options: {
                                    patterns: path.resolve(__dirname, "./src/styles/common.less")
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(png|svg|jpg|jpeg|gif)$/i,
                        type: "asset/inline"
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({ verbose: true }),
        new MiniCssExtractPlugin({
            // filename: "compoments.min.css"
        }),
        new webpack.ProgressPlugin(handler),
        new ESLintPlugin({})
        // new BundleAnalyzerPlugin()
    ],
    resolve: {
        // 自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
        extensions: [".js", ".json", ".css"],
        alias: {
            "@root": path.resolve(__dirname, "./"),
            "@src": path.resolve(__dirname, "./src"),
            "@compoments": path.resolve(__dirname, "./src/compoments"),
            "@tools": path.resolve(__dirname, "./src/tools"),
            "@assets": path.resolve(__dirname, "./src/assets")
        }
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
                extractComments: false
            })
        ],
        splitChunks: {
            chunks: "all"
        }
    }
};
