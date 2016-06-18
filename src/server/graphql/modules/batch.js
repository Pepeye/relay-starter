import { session } from '../../lib/db'
import { NEOA } from './helpers'

export default function(ids) {
  let params = ids
  let query = `
    MATCH (n)
    WHERE n.uuid in { ids }
    RETURN n
  `
  let result = session.run(query, params)
  // console.dir(result, {colors: true, depth: Infinity})
  return NEOA(result)
}
