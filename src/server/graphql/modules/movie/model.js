// import { session } from '../../../lib/db'
import { Node } from '../graph'
// import { NEOA } from '../helpers'

class Movie extends Node {

  constructor (props) {
    super(props)
    this.labels = ['Movie']
    this._types = ['Movie']
  }

}

export default Movie
