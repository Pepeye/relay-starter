import { session } from '../lib/db'
import DataLoader from 'dataloader'

export function batchLoader (ids, type) {
  let params = ids
  let query = `
    MATCH (n:${type})
    WHERE ID(n) in { ids }
    RETURN n
  `
  let result = session.run(query, params)
  console.dir(result, {colors: true, depth: Infinity})
  return result
}

export default function loaders () {
  return {
    movies: new DataLoader(ids => batchLoader(ids, 'Movie'))
  }
}
