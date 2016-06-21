import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  globalIdField
} from 'graphql-relay'

import { GraphQLCommonNodeFields } from '../../interfaces'
import { nodeInterface, registerType } from '../../definitions/node'
import Movie from './model'
import { GraphQLActorConnection } from '../actor'
import { GraphQLDirector } from '../director'

export const GraphQLMovie = registerType(new GraphQLObjectType({
  name: 'Movie',
  description: 'Movie resource',
  fields: () => ({
    id: globalIdField('Movie', obj => obj.uuid),
    ...GraphQLCommonNodeFields,
    title: { type: GraphQLString, description: 'Movie title' },
    description: { type: GraphQLString, description: 'Movie description' },
    language: { type: GraphQLString, description: 'Movie language' },
    imageUrl: { type: GraphQLString, description: 'Movie image URL/path' },
    trailer: { type: GraphQLString, description: 'Movie trailer link' },
    genre: { type: GraphQLString, description: 'Movie genre' },
    tagline: { type: GraphQLString, description: 'Movie tagline' },
    homepage: { type: GraphQLString, description: 'Movie homepage' },
    imdbId: { type: GraphQLString, description: 'IMDB Id' },
    studio: { type: GraphQLString, description: 'Movie production studio' },
    releaseDate: { type: GraphQLFloat, description: 'Movie release date' },
    runtime: { type: GraphQLInt, description: 'Movie runtime in minutes' },
    version: { type: GraphQLInt, description: 'Data version number' },
    actors: {
      type: GraphQLActorConnection,
      description: 'Movie cast - actors',
      args: connectionArgs,
      resolve: (data, args) => connectionFromPromisedArray((new Movie(data)).actors(), args)
    },
    directors: {
      type: new GraphQLList(GraphQLDirector),
      description: 'Movie cast - actors',
      resolve: (data, _, {loaders}) => (new Movie(data)).directors()
    }
  }),
  interfaces: [ nodeInterface ]
}))

export const { connectionType: GraphQLMovieConnection } = connectionDefinitions({nodeType: GraphQLMovie})
