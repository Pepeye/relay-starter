import { GraphQLScalarType, GraphQLError, Kind } from 'graphql'

export const GraphQLPasswordType = new GraphQLScalarType({
  name: 'Password',
  serialize: value => String(value),
  parseValue: value => String(value),
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Query error: Password is not a string, incorrect type (${ast.kind}) passed', [ast])
    }
    if (ast.value.length < 6) {
      throw new GraphQLError('Query error: Password must have a minimum length of 4.', [ast])
    }
    if (ast.value.length > 60) {
      throw new GraphQLError('Query error: Password is too long.', [ast])
    }
    return String(ast.value)
  }
})
