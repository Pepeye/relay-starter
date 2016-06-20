import { GraphQLObjectType } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface, registerType } from '../../definitions/node'

import { GraphQLMovieAPI } from '../movie'
import { GraphQLActorAPI } from '../actor'

let rootFields = {
  ...GraphQLActorAPI,
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
