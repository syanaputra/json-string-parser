const path = require('path');

// Import plugins
// -------
// Nothing to import

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
};

// Webpack configuration
module.exports = {
    entry: path.join(paths.SRC, 'StringWizard.js'),
    output: {
        path: paths.DIST,
        filename: 'StringWizard.js'
    },
    plugins: [],
    // Loaders configuration
    // We are telling webpack to use "babel-loader" for .js and .jsx files
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
