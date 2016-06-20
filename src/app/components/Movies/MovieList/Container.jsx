import Relay from 'react-relay'
import MovieList from './Component'

export default Relay.createContainer(MovieList, {
  initialVariables: {
    count: 20
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        movies (first: $count) {
          edges {
            node {
              id
              uuid
              title
              releaseDate
            }
          }
        }
      }
    `
  }
})
