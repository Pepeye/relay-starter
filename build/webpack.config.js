import webpack from 'webpack'
import rucksack from 'rucksack-css'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from './config'
import _debug from 'debug'

const debug = _debug('app:webpack:config')
const paths = config.UTILS_PATH
const {__DEV__, __PROD__, __TEST__} = config.GLOBALS

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.COMPILER_DEVTOOL,
  resolve: {
    modulesDirectories: [
      config.APP_PATH,
      'node_modules'
    ],
    root: paths.base(config.APP_PATH),
    extensions: ['', '.js', '.jsx', '.scss', '.json']
  },
  module: {}
}

// H E L P E R S   F U N C T I O N S

function getEntrySources (sources) {
  if (!__PROD__) {
    // return [
    //   ...sources,
    //   'webpack-hot-middleware/client',
    //   `webpack-hot-middleware/client?path=${config.COMPILER_PUBLIC_PATH}__webpack_hmr`,
    //   `webpack-dev-server/client?http://${config.HOST}:${config.PORT}`,
    //   'webpack/hot/dev-server'
    // ]
    return [
      ...sources,
      `webpack-dev-server/client?http://${config.HOST}:${config.PORT}`,
      'webpack/hot/only-dev-server'
    ]
  }

  return sources
}

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = `${paths.base(config.APP_PATH)}/${config.APP_MAIN}`

webpackConfig.entry = {
  app: __DEV__
    ? getEntrySources([APP_ENTRY_PATH])
    : [APP_ENTRY_PATH],
  vendor: config.VENDORS
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.COMPILER_HASH_TYPE}].js`,
  path: paths.base(config.DIST_PATH),
  publicPath: config.COMPILER_PUBLIC_PATH
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.GLOBALS),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }))
}

// ------------------------------------
// Pre-Loaders
// ------------------------------------
webpackConfig.module.preLoaders = [{
  test: /\.(js|jsx)$/,
  loader: 'eslint',
  exclude: /node_modules/
}]

webpackConfig.eslint = {
  configFile: paths.base('.eslintrc'),
  emitWarning: __DEV__
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel'
},
{
  test: /\.json$/,
  loader: 'json'
}]

// S T Y L E S

// use css modules
const cssLoader = [
  'css?modules',
  'sourceMap',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&')

// Don't treat global SCSS as modules
// Don't treat global, third-party CSS as modules
const globalStyleLoaders = [
  {
    test: /\.scss$/,
    exclude: paths.base(config.APP_PATH),
    loaders: [
      'style',
      'css?sourceMap',
      'postcss',
      'sass?sourceMap'
    ]
  },
  {
    test: /\.css$/,
    exclude: paths.base(config.APP_PATH),
    loaders: [
      'style',
      'css?sourceMap',
      'postcss'
    ]
  }
]

const styleLoaders = [
  {
    test: /\.scss$/,
    include: paths.base(config.APP_PATH),
    loaders: [
      'style',
      cssLoader,
      'postcss',
      'sass?sourceMap'
    ]
  },
  {
    test: /\.css$/,
    include: paths.base(config.APP_PATH),
    loaders: [
      'style',
      cssLoader,
      'postcss'
    ]
  },
  ...globalStyleLoaders
]

// F O N T S
/* eslint-disable */
const fontLoaders = [
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' }
]
/* eslint-enable */

// I M A G E S

const imageLoader = [
  { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader?name=img/img-[hash:6].[ext]&limit=5000' }
]

webpackConfig.module.loaders.push([
  ...styleLoaders,
  ...fontLoaders,
  ...imageLoader
])

// ------------------------------------
// Style Configuration
// ------------------------------------
// webpackConfig.sassLoader = {
//   includePaths: paths.client('styles')
// }

webpackConfig.postcss = [
  rucksack({
    autoprefixer: true
  })
]

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const [first, ...rest] = loader.loaders
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  )
}

export default webpackConfig
