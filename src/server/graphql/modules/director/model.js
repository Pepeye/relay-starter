import { Person } from '../person'

class Director extends Person {

  constructor (props) {
    super(props)
    this.labels = ['Director', 'Person']
    this._types = ['Director', 'Person']
  }

}

export default Director
