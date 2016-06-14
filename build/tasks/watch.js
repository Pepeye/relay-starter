import express from 'express'
import graphqlHTTP from 'express-graphql'
import logger from 'morgan'
import bodyParser from 'body-parser'
import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import config from '../config'
import chalk from 'chalk'
// import _debug from 'debug'
import schema from './../../src/server/graphql/schema'
import webpackConfig from '../webpack.config'

const api = express()
api.use(logger('dev'))
api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

/**
 * Authenticated Routs / Middleware
 */

/**
* GraphQL routes
*/
api.use('/graphql', graphqlHTTP(request => ({
  schema,
  graphiql: process.env.NODE_ENV !== 'production'
})))

/**
 * API routes / endpoints
 */
api.use('/info', (req, res) => {
  res.json({
    message: 'welcome to tengoku api!',
    owner: 'stratbox.io',
    date: Date.now()
  })
})

api.listen(config.GRAPHQL.PORT, () => {
  console.log(chalk.blue(`GraphQL is listening on port ${config.GRAPHQL.PORT}`))
})

const compiler = webpack(webpackConfig)
let devServerConfig = {
  // webpack-dev-server options
  // "dev": "webpack-dev-server --devtool --history-api-fallback --hot --inline --progress --colors",
  // contentBase: config.DIST_PATH,
  contentBase: config.APP_PATH,
  proxy: {
    '/graphql': `http://localhost:${config.GRAPHQL.PORT}`
  },
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  hot: true,
  inline: true,
  progress: true,
  stats: { colors: true }
}

const server = new WebpackDevServer(compiler, devServerConfig)

server.listen(config.PORT, config.HOST)
