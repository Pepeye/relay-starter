import { GraphQLObjectType } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface, registerType } from '../../definitions/node'

import { GraphQLMovieAPI } from '../movie'

let rootFields = {
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
