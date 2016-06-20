// import { session } from '../../../lib/db'
import { Node } from '../graph'
// import { NEOA } from '../helpers'

class Person extends Node {

  constructor (props) {
    super(props)
    this.labels = ['Person']
    this._types = ['Person']
  }

}

export default Person
