var fs = require('fs')
var path = require('path')

var jsonfile = path.join(__dirname, './src/server/graphql/schema.json')

// Read the schema.json file only if it exists, this fixed
// the problem of using babelRelayPlugin, defined in .babelrc,
// and running npm run update when the file doesn't exist
fs.access(jsonfile, fs.F_OK, function(err) {
  if (!err) module.exports = require('babel-relay-plugin')(require(jsonfile).data)
})
