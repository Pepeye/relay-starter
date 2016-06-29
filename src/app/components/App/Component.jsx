import React from 'react'
import $ from 'jquery'
import './app.scss'
import { Link } from 'react-router'

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  componentDidMount () {
    $('#target').click(function() {
      alert('Handler for .click() called.')
    })
  }

  render () {
    return (
      <div>
        <div>
          <Link to='/movies'>Movies</Link>
        </div>
        <div className='content'>
          {this.props.children}
        </div>
        <button id='target'>Test jQuery</button>
      </div>
    )
  }
}

export default App
