import DataLoader from 'dataloader'
// import Batch from './modules/batch'
import { session } from '../lib/db'
import { NEOA } from './modules/helpers'
import { Movie } from './modules/movie'

export const batchLoadFn = async (uuids: string[]) => {
  let params = { uuids }
  let query = `
    MATCH (n)
    WHERE n.uuid IN { uuids }
    RETURN n
  `

  let result = await session.run(query, params)
  return NEOA(result)
}

export default function loaders () {
  return {
    Movie: new DataLoader(uuids => Movie.load(uuids))
  }
}
