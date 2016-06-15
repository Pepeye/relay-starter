import {GraphQLObjectType} from 'graphql'

// TODO: import module mutations
// import { Mutation as school } from './modules/movie'

// const rootFields = Object.assign({}, movie, comment)
const rootFields = {
  // ...movie
}

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => (rootFields)
})
