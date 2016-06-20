import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'

const GraphQLTypes = {}

export function registerType (type) {
  GraphQLTypes[type.name] = type
  return type
}

class Viewer {}
let viewer = new Viewer()
// R E L A Y   N O D E

export const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId, context) => {
    let { type, id } = fromGlobalId(globalId)
    // console.dir({ GraphQLTypes }, {colors: true})
    // console.dir({ type, id }, {colors: true, depth: Infinity})
    // console.dir({ context }, {colors: true, depth: Infinity})
    if (type === 'Viewer') return { type, ...viewer }
    let loader = context.loaders[type]
    let item = await loader.load(id)
    // let item = await (loader & loader.load(id)) || null
    // console.dir({ item }, {colors: true, depth: Infinity})
    return { type, ...item }
  },
  function resolveGraphQLTypeFromObject (obj) {
    // console.log('node.obj')
    // console.dir({obj}, {colors: true, depth: Infinity})
    return GraphQLTypes[obj.type] || null
  }
)
