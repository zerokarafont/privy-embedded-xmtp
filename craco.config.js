const path = require('path');
const { ProvidePlugin } = require('webpack');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        plugins: {
            add: [
                new ProvidePlugin({
                    process: "process/browser",
                    Buffer: ["buffer", "Buffer"]
                })
            ]
        },
        configure: {
            resolve: {
                fallback: {
                    stream: require.resolve("stream-browserify")
                }
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        resolve: {
                            fullySpecified: false,
                        },
                    },
                ],
            },
        }
    }
}