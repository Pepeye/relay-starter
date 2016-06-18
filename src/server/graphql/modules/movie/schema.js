console.log('movies.schema')
import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {
  connectionDefinitions,
  globalIdField
} from 'graphql-relay'

import { GraphQLCommonNodeFields } from '../../interfaces'
import { nodeInterface, registerType } from '../../definitions/node'

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
    version: { type: GraphQLInt, description: 'Data version number' }
  }),
  interfaces: [ nodeInterface ]
}))

export const { connectionType: GraphQLMovieConnection } = connectionDefinitions({nodeType: GraphQLMovie})
