import Relay from 'react-relay'
import App from './Component'

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        movies (first: 10) {
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
