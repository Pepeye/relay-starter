import { session } from '../../lib/db'
import { NEOX } from './helpers'

async function batchFn (ids) {
  let params = { ids }
  let query = `
    MATCH (n)
    WHERE n.uuid in { ids }
    RETURN n
  `
  let result = await session.run(query, params)
  return NEOX(result)
}

export default batchFn
