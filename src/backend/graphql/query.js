import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay'

// import { Movie } from './modules/movie'

class Viewer {}
let viewer = new Viewer()

// R E L A Y   N O D E

export let { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    // let { type, id } = fromGlobalId(globalId)
    let { type } = fromGlobalId(globalId)
    switch (type) {
      case 'Viewer':
        return viewer
      // case 'Movie':
      //   return Movie.fetch(id)
      default:
        return null
    }
  },
  (obj) => {
    if (obj instanceof Viewer) {
      return GraphQLViewer
    } else if (obj.labels) {
      // if (obj.labels.indexOf('Movie') !== -1) return GraphQLAccount
    }
    return null
  }
)

// V I E W E R

let rootFields = {
  // ...movieAPI
}

let GraphQLViewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    ...rootFields
  }),
  interfaces: [nodeInterface]
})

let query = new GraphQLObjectType({
  name: 'Query',
  // fields: () => (rootFields)
  fields: () => ({
    viewer: {
      type: GraphQLViewer,
      resolve: () => viewer
    },
    node: nodeField
  })
})

export default new GraphQLSchema({
  query
})
