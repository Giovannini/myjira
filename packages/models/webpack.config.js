 const path = require('path')

const isEnvDevelopment = process.env.NODE_ENV === "development"
const isEnvProduction = process.env.NODE_ENV === "production"

module.exports = {
  mode: isEnvProduction
    ? "production"
    : (isEnvDevelopment && "development") || "none",
  target: 'node',
  // devtool: 'inline-source-map',
  // context: path.resolve(__dirname, 'src'),
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'models.js',
    path: path.resolve(__dirname, 'lib'),
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: [".ts", ".js"],
    symlinks: true,
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  }
}
