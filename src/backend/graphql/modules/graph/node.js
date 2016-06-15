import UUID from 'node-uuid'
import { session } from '../../../lib/db'
import {
  labelTypes,
  NEON,
  NEOA,
  spreadPropsMap
} from '../helpers'

export default class Node {
  /**
   * TODO: consider refactoring props to single variable [DONE!]
   * Neo4j response = { _id, labels[], properties{} }
   */
  constructor (props) {
    // let { labels, properties } = props
    let { id, labels, ...properties } = props
    this.id = id || null
    this.labels = labels || []
    this.properties = {
      uuid: properties.uuid || UUID.v4(),
      ...properties
    }
    this._types = [] // node
  }

  get types () {
    return this._types
  }

  get id () {
    return this.id
  }

  get uuid () {
    return this.properties.uuid
    // return this.data.get('uuid')
  }

  get label () {
    return this.labels
    // return this.data.get('labels').toArray()
  }

  set label (values) {
    this.labels = values
    // return this.data.set('labels', values)
  }

  get data () {
    return this.properties
    // return this.data.get('labels').toArray()
  }

  set data (values) {
    this.properties = values
    // return this.data.get('labels').toArray()
  }

  toObject () {
    let { labels, properties } = this
    return { labels, properties }
  }

  async save () {
    let { labels, properties } = this
    let timestamp = Date.now()
    properties = { ...properties, createdAt: timestamp, updatedAt: timestamp }
    let params = { props: properties }
    let query = `
      MERGE (n {uuid: { props }.uuid } )
      ON CREATE SET n = { props }, n ${labelTypes(labels)}
      ON MATCH SET n += { props }, n ${labelTypes(labels)}
      RETURN n
    `

    // if no labels adjust cypher query
    if (labels.length === 0) {
      query = `
        MERGE (n {uuid: { uuid } } )
        ON CREATE SET n = { props }
        ON MATCH SET n += { props }
        RETURN n
        LIMIT 1
      `
    }

    let result = await session.run(query, params)
    return NEON(result)
  }

  async delete () {
    let { uuid } = this
    let query = `
      MATCH (n {uuid: '${uuid}'})
      SET n :Archived,
          n.archived = true,
          n.archivedAt = ${Date.now()}
      RETURN n
    `
    return await session.run(query)
      .then((result) => {
        return {
          ...result,
          status: {
            code: 200,
            message: `Node (uuid: ${uuid}) successfully deleted`
          }
        }
      })
      .catch(err => err)
  }

  async destroy () {
    let { uuid } = this
    let query = `
      MATCH (n {uuid: '${uuid}'})
      DETACH DELETE n
    `
    return await session.run(query)
      .then((result) => {
        return {
          ...result,
          status: {
            code: 200,
            message: `Node (uuid: ${uuid}) successfully destroyed`
          }
        }
      })
      .catch(err => err)
  }

  // S T A T I C   M E T H O D S

  static async all (labels = [], limit = 100) {
    let params = { limit }
    let query = `
      MATCH (n${labelTypes(labels)})
      RETURN n
      LIMIT { limit }
    `
    let result = await session.run(query, params)
    return NEOA(result)
  }

  static async create (props) {
    let node = await new this(props).save()
    return new this(node)
  }

  static async find (uuid) {
    let query = `
      MATCH (n {uuid: '${uuid}' })
      RETURN n
      LIMIT 1
    `

    let result = await session.run(query)
    return NEON(result)
  }

  static async findOne (labels = []) {
    let query = `
      MATCH (n${labelTypes(labels)})
      RETURN n
      LIMIT 1
    `
    let result = await session.run(query)
    return NEON(result)
  }

  static async findByEmail (email) {
    let query = `
      MATCH (n {email: '${email}' })
      RETURN n
      LIMIT 1
    `

    let result = await session.run(query)
    return NEON(result)
  }

  static async fetch (uuid) {
    let query = `
      MATCH (n {uuid: '${uuid}' })
      RETURN n
      LIMIT 1
    `

    let result = await session.run(query)
    return new this(NEON(result))
  }

  static async query (qry) {
    let result = await session.run(qry)
    return NEOA(result)
  }

  static async where (conditions = {}, limit = 50) {
    let { types } = this
    let params = { limit }
    let query = `
      MATCH (n${labelTypes(types)} {${spreadPropsMap(conditions)}})
      RETURN n
      LIMIT { limit }
    `

    let result = await session.run(query, params)
    return NEOA(result)
  }
}
