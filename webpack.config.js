var path = require('path');
module.exports = {
    cache: true,
    devtool: 'eval',
    entry: './app/app.js',
    output: {
        path: path.join(__dirname, "build"),
        filename: 'build.min.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.coffee']
    }
};