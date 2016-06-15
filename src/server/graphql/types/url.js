import { GraphQLScalarType, GraphQLError, Kind } from 'graphql'

export const GraphQLURLType = new GraphQLScalarType({
  name: 'URL',
  serialize: value => String(value),
  parseValue: value => String(value),
  parseLiteral: ast => {
    const re = /(https?|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    if (!re.test(ast.value)) {
      throw new GraphQLError('Query error: Not a valid URL', [ast])
    }
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: URL is not a string, incorrect valuel of type (${ast.kind}) passed`, [ast])
    }
    if (ast.value.length < 1) {
      throw new GraphQLError('Query error: URL must have a minimum length of 1.', [ast])
    }
    if (ast.value.length > 2083) {
      throw new GraphQLError('Query error: URL is too long.', [ast])
    }
    return String(ast.value)
  }
})
