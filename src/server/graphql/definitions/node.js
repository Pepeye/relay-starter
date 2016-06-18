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

// export const { nodeInterface, nodeField } = nodeDefinitions(
//   (globalId) => {
//     let { type, id } = fromGlobalId(globalId)
//     switch (type) {
//       case 'Viewer':
//         return viewer
//       case 'Movie':
//         return Movie.fetch(id)
//       default:
//         return null
//     }
//   },
//   (obj) => {
//     if (obj instanceof Viewer) {
//       return GraphQLViewer
//     } else if (obj.labels) {
//       if (obj.labels.indexOf('Movie') !== -1) return GraphQLMovie
//     }
//     return null
//   }
// )
