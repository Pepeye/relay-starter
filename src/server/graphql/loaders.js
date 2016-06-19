console.log('root.loaders')
import DataLoader from 'dataloader'
// import Batch from './modules/batch'
import { session } from '../lib/db'
import { NEOA } from './modules/helpers'
// import { Loader as movies } from './modules/movie'

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

const batchFn = async (keys) => {
  let params = keys
  let query = `
    MATCH (n)
    WHERE n.uuid IN { keys }
    RETURN n
  `
  console.log('[keys]', keys)
  console.log(query)
  let result = await session.run(query, params)
  return NEOA(result)
}

export default function loaders () {
  return {
    Movie: new DataLoader(keys => batchFn(keys))
  }
}
