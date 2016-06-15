import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import {
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay'

import { GraphQLMovie, GraphQLMovieConnection } from './schema'
import Movie from './model'

export default {
  movie: {
    description: 'find a movie by uuid',
    type: GraphQLMovie,
    args: {
      uuid: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (root, { uuid }) => Movie.find(uuid)
  },

  movies: {
    description: 'a list of movies',
    type: GraphQLMovieConnection,
    args: connectionArgs,
    resolve: (root, args) => connectionFromPromisedArray(
      Movie.all(['Movie']),
      args
    )
  }
}
