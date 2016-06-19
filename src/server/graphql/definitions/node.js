import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'

const GraphQLTypes = {}

export function registerType (type: Object) {
  GraphQLTypes[type.name] = type
  return type
}

// R E L A Y   N O D E

export const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId, context) => {
    let { type, id } = fromGlobalId(globalId)
    console.dir({ context }, {colors: true, depth: Infinity})
    let loader = context.loaders[type]
    console.dir({ GraphQLTypes }, {colors: true})
    return (loader & loader.load(id)) || null
  },
  function resolveGraphQLTypeFromObject (obj) {
    console.log('node.obj')
    console.dir({obj}, {colors: true, depth: Infinity})
    return GraphQLTypes[obj.constructor.name] || null
  }
)
