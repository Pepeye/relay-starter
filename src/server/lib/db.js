import { v1 as neo4j } from 'neo4j-driver'

const config = {
  neo4j: {
    url: 'http://localhost:7474',
    bolt: 'bolt://localhost',
    auth: {
      username: process.env.NEO4J_USER || 'neo4j',
      password: process.env.NEO4J_PASS || 'neopass'
    }
  }
}

let { username, password } = config.neo4j.auth
/**
 * Official neo4j driver
 * https://github.com/neo4j/neo4j-javascript-driver
 */

export const driver = neo4j.driver(config.neo4j.bolt, neo4j.auth.basic(username, password))

export const session = driver.session()
