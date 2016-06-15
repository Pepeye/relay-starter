import { GraphQLScalarType, GraphQLError, Kind } from 'graphql'

export const GraphQLEmailType = new GraphQLScalarType({
  name: 'Email',
  serialize: value => value.toLowerCase(),
  parseValue: value => value.toLowerCase(),
  parseLiteral: ast => {
    const re = /.+@.+/
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Email is not a string, incorrect value of type (${ast.kind}) passed`, [ast])
    }
    if (!re.test(ast.value)) {
      throw new GraphQLError('Query error: Not a valid Email', [ast])
    }
    if (ast.value.length < 4) {
      throw new GraphQLError('Query error: Email must have a minimum length of 4.', [ast])
    }
    if (ast.value.length > 300) {
      throw new GraphQLError('Query error: Email is too long.', [ast])
    }
  }
})
