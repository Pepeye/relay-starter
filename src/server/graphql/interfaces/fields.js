import {
  GraphQLString,
  GraphQLList,
  GraphQLFloat
} from 'graphql'

// resolve: (obj) => obj._id
export const GraphQLCommonNodeFields = {
  labels: { type: new GraphQLList(GraphQLString), description: 'The labels of the resource/node' },
  uuid: { type: GraphQLString, description: 'The uuid of the resource/node' },
  createdAt: { type: GraphQLFloat, description: 'The UTC datetime the resource/node was created' },
  updatedAt: { type: GraphQLFloat, description: 'The UTC datetime the resource/node was last updated' }
}

export const GraphQLNameDescField = {
  name: { type: GraphQLString, description: 'The name of the resource/node' },
  description: { type: GraphQLString, description: 'The description of the resource/node' }
}
