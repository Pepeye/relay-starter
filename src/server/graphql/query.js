console.log('root.query')
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { nodeField } from './definitions/node'
import { GraphQLViewer } from './modules/viewer'

// V I E W E R
class Viewer {}
let viewer = new Viewer()

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
