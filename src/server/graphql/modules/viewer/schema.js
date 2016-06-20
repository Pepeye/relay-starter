import { GraphQLObjectType } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface, registerType } from '../../definitions/node'

import { GraphQLActorAPI } from '../actor'
import { GraphQLDirectorAPI } from '../director'
import { GraphQLMovieAPI } from '../movie'

let rootFields = {
  ...GraphQLActorAPI,
  ...GraphQLDirectorAPI,
  ...GraphQLMovieAPI
}

export default registerType(new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    ...rootFields
  }),
  interfaces: [ nodeInterface ]
}))
