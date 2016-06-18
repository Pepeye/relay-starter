import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'

const GraphQLTypes = {}

export function registerType (type: Object) {
  GraphQLTypes[type.name] = type
  return type
}

// class Viewer {}
// let viewer = new Viewer()

// R E L A Y   N O D E

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, { loaders }) => {
    let { type, id } = fromGlobalId(globalId)
    const loader = loaders[type]
    return loader.load(id) || null
  },
  (obj) => GraphQLTypes[obj.constructor.name] || null
)
