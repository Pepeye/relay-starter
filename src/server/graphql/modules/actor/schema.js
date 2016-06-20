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

import { GraphQLCommonNodeFields, GraphQLPersonInterface } from '../../interfaces'
import { nodeInterface, registerType } from '../../definitions/node'

export const GraphQLActor = registerType(new GraphQLObjectType({
  name: 'Actor',
  description: 'Actor resource',
  fields: () => ({
    id: globalIdField('Actor', obj => obj.uuid),
    ...GraphQLCommonNodeFields,
    name: { type: GraphQLString, description: 'Self discriptive' },
    biography: { type: GraphQLString, description: 'Self discriptive' },
    birthplace: { type: GraphQLString, description: 'Self discriptive' },
    birthday: { type: GraphQLFloat, description: 'Self discriptive' },
    lastModified: { type: GraphQLFloat, description: 'The UTC datetime the resource/node was last modified' },
    profileImageUrl: { type: GraphQLString, description: 'Self discriptive' },
    version: { type: GraphQLInt, description: 'Data version number' }
  }),
  interfaces: [ nodeInterface, GraphQLPersonInterface ]
}))

export const { connectionType: GraphQLActorConnection } = connectionDefinitions({nodeType: GraphQLActor})
