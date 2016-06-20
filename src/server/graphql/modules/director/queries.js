import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import {
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay'

import { GraphQLDirector, GraphQLDirectorConnection } from './schema'
import Director from './model'

export default {
  director: {
    description: 'find a actor by uuid',
    type: GraphQLDirector,
    args: {
      uuid: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (root, { uuid }, { loaders }) => loaders.Director.load(uuid)
  },

  directors: {
    description: 'a list of actors',
    type: GraphQLDirectorConnection,
    args: connectionArgs,
    resolve: (root, args) => connectionFromPromisedArray(
      Director.all(['Director']),
      args
    )
  }
}
