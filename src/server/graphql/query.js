import { GraphQLObjectType } from 'graphql'
import { nodeField } from './definitions/node'
import { GraphQLViewer } from './modules/viewer'

// V I E W E R
class Viewer {}

export default new GraphQLObjectType({
  name: 'Query',
  // fields: () => (rootFields)
  fields: () => ({
    viewer: {
      type: GraphQLViewer,
      resolve: () => new Viewer()
    },
    node: nodeField
  })
})
