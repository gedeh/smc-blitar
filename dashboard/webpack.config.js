const { join } = require("path")
const webpack = require("webpack")

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: join(__dirname, "src", "components", "index.jsx"),
    output: {
        path: join(__dirname, "public", "bundle"),
        filename: "client.min.js",
        publicPath: "/public/"
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    join(__dirname, "src/components"),
                    join(__dirname, "src/bundles")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        [
                            "module-resolver",
                            {
                                root: [ "./" ],
                                alias: {
                                    "@components": join(__dirname, "src/components"),
                                    "@bundles": join(__dirname, "src/bundles")
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DASHBOARD_EXTERNAL_URL__: JSON.stringify(process.env.DASHBOARD_EXTERNAL_URL),
            __METABASE_EXTERNAL_URL__: JSON.stringify(process.env.METABASE_EXTERNAL_URL)
        }),
        // new webpack.HotModuleReplacementPlugin() // hot module not working yet
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devtool: "source-map"
}
