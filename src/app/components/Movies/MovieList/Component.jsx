import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class MovieList extends React.Component {
  static propTypes = {
    relay: PropTypes.object,
    viewer: PropTypes.object.isRequired
  }

  loadMore () {
    let count = this.props.relay.variables.count

    // update variables
    this.props.relay.setVariables({
      count: count + 10
    })
  }

  render () {
    // TODO: move to own component
    let content = this.props.viewer.movies.edges.map(edge => {
      return (
        <li key={edge.node.id}>
          <Link to={`/movies/${edge.node.uuid}`}>{edge.node.title}</Link>
        </li>
      )
    })

    return (
      <ul>
        {content}
        <br />
        <button onClick={() => this.loadMore()}>Load More</button>
      </ul>
    )
  }
}

export default MovieList
