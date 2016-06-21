import { session } from '../../../lib/db'
import { Node } from '../graph'
import { NEOA } from '../helpers'

class Movie extends Node {

  constructor (props) {
    super(props)
    this.labels = ['Movie']
    this._types = ['Movie']
  }

  async actors () {
    let params = { uuid: this.uuid }
    let query = `
      MATCH (m:Movie {uuid: { uuid } })<-[:ACTS_IN]-(a:Actor)
      RETURN a
    `
    let result = await session.run(query, params)
    return NEOA(result)
  }

}

export default Movie
