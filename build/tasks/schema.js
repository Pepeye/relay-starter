import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import Schema from '../../src/server/graphql/schema'
import { graphql } from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities'

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const JSON_SCHEMA = path.join(__dirname, '../../src/server/graphql/schema.json')
  const GRAPHQL_SCHEMA = path.join(__dirname, '../../src/server/graphql/schema.graphql')

  console.log(chalk.yellow('[schema]: Started creating JSON Scehma'))
  try {
    let result = await (graphql(Schema, introspectionQuery))
    // console.dir(result, {colors: true, depth: Infinity})
    if (result.errors) {
      throw result.errors
    } else {
      fs.writeFileSync(JSON_SCHEMA, JSON.stringify(result, null, 2))
      fs.writeFileSync(GRAPHQL_SCHEMA, printSchema(Schema))
      console.log(chalk.blue('[schema]: Finished creating JSON Scehma'))
    }
  } catch (err) {
    console.error(
      chalk.red('[error]: Error introspecting schema: '),
      JSON.stringify(err, null, 2)
    )
  } finally {
    process.exit()
  }
  // const JSON_SCHEMA = path.join(__dirname, '../../src/server/graphql/schema.json')
  // const GRAPHQL_SCHEMA = path.join(__dirname, '../../src/server/graphql/schema.graphql')
  //
  // console.log(chalk.yellow('[schema]: Started creating JSON Scehma'))
  // let result = await (graphql(Schema, introspectionQuery))
  // if (result.errors) {
  //   console.error(
  //     chalk.red('[error]: Error introspecting schema: '),
  //     JSON.stringify(result.errors, null, 2)
  //   )
  // } else {
  //   fs.writeFileSync(JSON_SCHEMA, JSON.stringify(result, null, 2))
  //   fs.writeFileSync(GRAPHQL_SCHEMA, printSchema(Schema))
  //   console.log(chalk.blue('[schema]: Finished creating JSON Scehma'))
  // }
})()
