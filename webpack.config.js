const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    globalObject: 'self',
		filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
        test: /\.ttf$/,
				use: ['file-loader']
			}
		]
	},
  plugins: [
		new MonacoWebpackPlugin({
			languages: ['typescript', 'javascript', 'json']
		})
	],
  watch: true,
  cache: true
};
