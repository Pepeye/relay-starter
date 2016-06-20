// import { session } from '../../../lib/db'
import { Person } from '../person'
// import { NEOA } from '../helpers'

class Actor extends Person {

  constructor (props) {
    super(props)
    this.labels = ['Actor', 'Person']
    this._types = ['Actor', 'Person']
  }

}

export default Actor
