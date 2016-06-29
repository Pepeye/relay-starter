import React from 'react'
import JSONTree from 'react-json-tree'
import { flat as theme, options } from '../../Tools'

class Movie extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object
  }

  render () {
    let { movie } = this.props.viewer

    return (
      <div>
        <JSONTree data={movie} theme={options(theme)} isLightTheme={false} />
      </div>
    )
  }

}

export default Movie
