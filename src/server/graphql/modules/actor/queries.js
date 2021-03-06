import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import {
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay'

import { GraphQLActor, GraphQLActorConnection } from './schema'
import Actor from './model'

export default {
  actor: {
    description: 'find a actor by uuid',
    type: GraphQLActor,
    args: {
      uuid: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (root, { uuid }, { loaders }) => loaders.Actor.load(uuid)
  },

  actors: {
    description: 'a list of actors',
    type: GraphQLActorConnection,
    args: connectionArgs,
    resolve: (root, args) => connectionFromPromisedArray(
      Actor.all(['Actor']),
      args
    )
  }
}
