import Relay from 'react-relay'
import Movie from './Component'

export default Relay.createContainer(Movie, {
  initialVariables: {
    uuid: ''
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        movie(uuid: $uuid) {
          id
          ... on Movie {
            labels
            uuid
            title
            genre
            tagline
            imdbId
            releaseDate
            runtime
            actors (first: 20) {
              cast: edges {
                actor: node {
                  id
                  uuid
                  labels
                  name
                }
              }
            }
            directors {
              id
              uuid
              labels
              name
            }
          }
        }
      }
    `
  }
})
