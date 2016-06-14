import express from 'express'
import graphqlHTTP from 'express-graphql'
import logger from 'morgan'
import bodyParser from 'body-parser'
import options from './lib/options'
import _debug from 'debug'
import schema from './graphql/schema'

let paths = options.paths

/**
 * Base App Configuration
 */
const app = express()
const debug = _debug('api:server')
// const Book = new Book()

debug('configuring server middleware')

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

debug('finished configuring server middleware')

/**
 * Authenticated Routs / Middleware
 */

/**
* GraphQL routes
*/
app.use('/graphql', graphqlHTTP(request => ({
  schema,
  graphiql: process.env.NODE_ENV !== 'production'
  // rootValue: {
  //   domain: request.hostname,
  //   locale: request.cookies.locale || 'en',
  //   user: request.user,
  //   loaders: loaders()
  // }
})))

/**
 * API routes / endpoints
 */
app.use('/info', (req, res) => {
  res.json({
    message: 'welcome to neutron api!',
    owner: 'stratbox.io',
    date: Date.now()
  })
})

app.use('/', express.static(paths.base('dist')))

/**
 * Error handling
 * Note: must be declared after routes
 */
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  let status = err.status || 500

  debug(err)
  res.status(status)
  res.end('Server Error: ' + status)
})

export default app
