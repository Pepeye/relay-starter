import {
  GraphQLString,
  GraphQLInterfaceType,
  GraphQLInt,
  GraphQLFloat
} from 'graphql'
import { fromGlobalId } from 'graphql-relay'
import { GraphQLTypes } from '../definitions/node'
import { GraphQLCommonNodeFields } from './fields'

const resolveType = (data) => {
  let { type } = fromGlobalId(data.id)
  return GraphQLTypes[type]
}

export const GraphQLPersonInterface = new GraphQLInterfaceType({
  name: 'Person',
  description: 'Person data resource/node',
  fields: () => ({
    ...GraphQLCommonNodeFields,
    name: { type: GraphQLString, description: 'Self discriptive' },
    biography: { type: GraphQLString, description: 'Self discriptive' },
    birthplace: { type: GraphQLString, description: 'Self discriptive' },
    birthday: { type: GraphQLFloat, description: 'Self discriptive' },
    lastModified: { type: GraphQLFloat, description: 'The UTC datetime the resource/node was last modified' },
    profileImageUrl: { type: GraphQLString, description: 'Self discriptive' },
    version: { type: GraphQLInt, description: 'Data version number' }
  }),
  resolveType: resolveType
})
