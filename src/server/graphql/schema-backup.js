import {
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay'

import { GraphQLCommonNodeFields } from './interfaces'

import { Movie } from './modules/movie'

class Viewer {}
let viewer = new Viewer()

// R E L A Y   N O D E

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { type, id } = fromGlobalId(globalId)
    switch (type) {
      case 'Viewer':
        return viewer
      case 'Movie':
        return Movie.fetch(id)
      default:
        return null
    }
  },
  (obj) => {
    if (obj instanceof Viewer) {
      return GraphQLViewer
    } else if (obj.labels) {
      if (obj.labels.indexOf('Movie') !== -1) return GraphQLMovie
    }
    return null
  }
)

// M O V I E

let GraphQLMovie = new GraphQLObjectType({
  name: 'Movie',
  description: 'Movie resource',
  fields: () => ({
    // id: globalIdField('School', obj => obj.id)
    id: globalIdField('Movie', obj => obj.id),
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
})

export const { connectionType: GraphQLMovieConnection } = connectionDefinitions({nodeType: GraphQLMovie})

let GraphQLMovieAPI = {
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

// V I E W E R

let rootFields = {
  ...GraphQLMovieAPI
}

let GraphQLViewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    ...rootFields
  }),
  interfaces: [ nodeInterface ]
})

let query = new GraphQLObjectType({
  name: 'Query',
  // fields: () => (rootFields)
  fields: () => ({
    viewer: {
      type: GraphQLViewer,
      resolve: () => viewer
    },
    node: nodeField
  })
})

export default new GraphQLSchema({
  query
})
