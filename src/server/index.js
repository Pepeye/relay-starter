
import options from './lib/options'
import app from './server'
import _debug from 'debug'

// import initialiseDB from './lib/initdb'

const debug = _debug('api:server')
const PORT = options.port
const HOST = options.host

// run database initialisation
// initialiseDB(options.rethinkdb.db)

app.listen(PORT, HOST, () => {
  debug('Starting server')
  console.log(`
    Server Started
    =============================
    Env  : ${process.env.NODE_ENV}
    host : ${HOST}
    Port : ${PORT}
    -----------------------------
   `)
})
