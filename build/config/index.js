import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'

const ENV = process.env.NODE_ENV || 'development'

let debug = _debug('app:config')
debug('Create configuration.')
debug(`Running with NODE_ENV "${ENV}".`)

// C R E A T E   B A S E   C O N F I G U R A T I O N
debug = _debug('app:config:base')

let config = {
  env: process.env.NODE_ENV || 'development',

  // P R O J E C T   S T R U C T U R E
  ROOT_PATH: path.resolve(__dirname, '../../'),
  APP_PATH: 'src/app',
  DIST_PATH: 'dist',
  SERVER_PATH: 'src/server',
  TEST_PATH: 'tests',
  APP_MAIN: 'index.js',

  // S E R V E R   C O N F I G U R A T I O N
  HOST: 'localhost',
  PORT: process.env.PORT || 3000,
  GRAPHQL: {
    PORT: 4000
  },

  // C O M P I L E R   C O N F I G U R A T I O N
  COMPILER_CSS_MODULES: true,
  COMPILER_DEVTOOL: 'source-map',
  COMPILER_HASH_TYPE: 'hash',
  COMPILER_FAIL_ON_WARNING: false,
  COMPILER_QUIET: false,
  COMPILER_PUBLIC_PATH: '',
  COMPILER_STATS: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  VENDORS: [
    'react',
    'react-router'
  ],

  // T E S T   C O N F I G U R A T I O N
  TEST_COVERAGE: !argv.watch,
  TEST_REPORTERS: [
    {type: 'lcov', dir: 'coverage/', subdir: '.'},
    {type: 'json', dir: 'coverage/', subdir: '.'},
    {type: 'text-summary'}
  ]
}

// E N V I R O N M E N T
// globals added here must ALSO be added to .eslintrc
config.GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify(ENV)
  },
  'NODE_ENV': ENV,
  '__DEV__': ENV === 'development',
  '__PROD__': ENV === 'production',
  '__TEST__': ENV === 'test',
  '__DEBUG__': ENV === 'development' && !argv.no_debug,
  '__DEBUG_NEW_WINDOW__': !!argv.nw,
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

// V A L I D A T E   D E P E N D A N C I E S
let pkg = require('../../package.json')

config.VENDORS = config.VENDORS
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })

// U T I L S   /   H E L P E R S
config.UTILS_PATH = (() => {
  let resolve = path.resolve

  let base = (...args) =>
    resolve.apply(resolve, [config.ROOT_PATH, ...args])

  return {
    base: base,
    client: base.bind(null, config.APP_PATH),
    dist: base.bind(null, config.DIST_PATH)
  }
})()

// E N V I R O N M E N T   O V E R R I D E S
// debug(`Apply environment overrides for NODE_ENV "${config.env}".`)

if (ENV === 'development') {
  debug(`Apply environment overrides for NODE_ENV "${config.env}".`)
  // We use an explicit public path when the assets are served by webpack
  // to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  let overrides = {
    COMPILER_PUBLIC_PATH: `http://${config.HOST}:${config.PORT}/`,
    PROXY: {
      enabled: false,
      options: {
        // koa-proxy options
        host: 'http://localhost:8000',
        match: /^\/api\/.*/
      }
    }
  }
  config = Object.assign({}, config, overrides)
  // config = { config, ...overrides }
}

if (ENV === 'production') {
  debug(`Apply environment overrides for NODE_ENV "${config.env}".`)
  let overrides = {
    COMPILER_FAIL_ON_WARNING: false,
    COMPILER_HASH_TYPE: 'chunkhash',
    COMPILER_DEVTOOL: null,
    COMPILER_STATS: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  }
  // config = { config, ...overrides }
  config = Object.assign({}, config, overrides)
}

export default config
