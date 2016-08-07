import {resolve} from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default (env) => {
  return {
    entry: `./app.js`,
    output: {
      filename: `bundle.js`,
      path: resolve(__dirname, `dist`),
      pathinfo: !env.prod,
    },
    context: resolve(__dirname, `src`),
    devtool: env.prod ? `source-map` : `eval`,
    bail: env.prod,
    module: {
      preLoaders: [
        {
          test: /\.js?$/,
          loader: `eslint`,
          exclude: /node_modules/,
        },
      ],
      loaders: [
        {
          test: /\.js$/,
          loader: `babel`,
          exclude: /node_modules/,
        },
      ],
    },
    eslint: {
      failOnWarning: false,
      failOnError: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: `Cycle starter`,
        inject: true,
        template: `templates/main.html`,
        minify: {decodeEntities: true},
      }),
    ],
  }
}
