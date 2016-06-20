import DataLoader from 'dataloader'
// import Batch from './modules/batch'
import { session } from '../lib/db'
import { NEOX } from './modules/helpers'
import { Movie } from './modules/movie'

// function batchFn (keys) {
//   return new Promise((resolve, reject) => {
//     let params = keys
//     let query = `
//       MATCH (n)
//       WHERE n.uuid IN { keys }
//       RETURN n
//     `
//
//     return session.run(query, params)
//             .then(result => resolve(NEOA(result)))
//             .catch(err => reject(err))
//   })
// }

// function batchFn (keys) {
//   let params = keys
//   let query = `
//     MATCH (n)
//     WHERE n.uuid IN { keys }
//     RETURN n
//   `
//   console.log('[keys]', keys)
//   console.log(query)
//   return session
//           .run(query, params)
//           .then(result => {
//             console.dir({result}, {colors: true, depth: Infinity})
//             return NEOA(result)
//           })
// }

export const batchFn = async (uuids: string[]) => {
  let params = { uuids }
  let query = `
    MATCH (n)
    WHERE n.uuid IN { uuids }
    RETURN n
  `

  let result = await session.run(query, params)
  return NEOX(result)
}

export default function loaders () {
  return {
    Movie: new DataLoader(uuids => Movie.load(uuids))
  }
}
