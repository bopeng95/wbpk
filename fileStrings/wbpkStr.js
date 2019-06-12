module.exports = `const path = require('path');

module.exports = (env) => {
    return {
        mode: env.NODE_ENV,
        entry: path.join(__dirname, '/src/index.js'),
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ['react-hot-loader/babel']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
		resolve: { alias: { 'react-dom': '@hot-loader/react-dom' } },
        devServer: {
            contentBase: path.join(__dirname),
            publicPath: '/build',
            hot: true,
            historyApiFallback: true,
            proxy: {
                '/api': 'http://localhost:3000'
            }
        }
    }
}`;
