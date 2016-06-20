// D B   ( N E O 4 J   S P E C I F I C   H E L P E R S)

export function labelTypes (labels) {
  if (labels && labels.length > 0) {
    let str = (labels && Array.isArray(labels)) ? labels.join(':') : labels
    return `:${str}`
  }
  return ''
}

export function edgeTypes (edges) {
  if (edges && edges.length > 0) {
    let str = (edges && Array.isArray(edges)) ? edges.join('|') : edges
    return `:${str.toUpperCase()}`
  }
  return ''
}

export function addPropsMap (props, alias) {
  let arr = []
  let result = ''
  if (props) {
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        // console.log(`${alias}.${key} = ${props[key]}`)
        if (typeof props[key] === 'string') {
          arr.push(`${alias}.${key} = '${props[key]}'`)
        } else {
          arr.push(`${alias}.${key} = ${props[key]}`)
        }
      }
    }
    result = arr.join(', ')
  }
  return result
}

export function spreadPropsMap (props) {
  let arr = []
  let result = ''
  if (props) {
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        // console.log(`${alias}.${key} = ${props[key]}`)
        if (typeof props[key] === 'string') {
          arr.push(`${key}: '${props[key]}'`)
        } else {
          arr.push(`${key}: ${props[key]}`)
        }
      }
    }
    result = arr.join(', ')
  }
  return result
}

/**
 * Returns data in Neo4j structure: { identity, labels[], properties {} }
 * of as flat javascript object {}
 * params: flat: boolean, default = false
 */
export function FLATNODE (node, flat = false) {
  return (flat) ? Object.assign({
    // _id: node._id || null,
    id: node.identity.low || 0,
    // ...node.identity,
    labels: node.labels,
    ...node.properties
  }) : node
}

/**
 * Returns array of records[ node(s) ]
 */
export function NEOA ({records, ...rest}, {node = 'n', flat = true} = {}) {
  if (Array.isArray(records) && records !== 'undefined') {
    /* if results are found */
    if (records.length > 0) {
      let output = records.map(({keys, _fields}) => {
        return _fields.reduce((result, field, index) => {
          if (Object.keys(keys).length > 1) {
            result[keys[index]] = FLATNODE(field, flat)
            return result
          } else {
            return FLATNODE(field, flat)
          }
          // return result
        }, {})
      })
      return output
    } else {
      // flag empty results
      return records
    }
  }
}

/**
 * Returns single record of node(s)
 */
export function NEON ({records, ...rest}, {node = 'n', flat = true} = {}) {
  if (Array.isArray(records) && records !== 'undefined') {
    /* if results are found */
    if (records.length > 0) {
      let output = records.map(({keys, _fields}) => {
        return _fields.reduce((result, field, index) => {
          if (Object.keys(keys).length > 1) {
            result[keys[index]] = FLATNODE(field, flat)
            return result
          } else {
            return FLATNODE(field, flat)
          }
          // return result
        }, {})
      })
      return output[0]
    } else {
      // flag empty results
      return records
    }
  }
}

/**
 * Returns single record of node(s) OR multiple record of node(s)
 */
export function NEOX ({records, ...rest}, {flat = true} = {}) {
  if (Array.isArray(records) && records !== 'undefined') {
    /* if results are found */
    if (records.length > 0) {
      let output = records.map(({keys, _fields}) => {
        return _fields.reduce((result, field, index) => {
          if (Object.keys(keys).length > 1) {
            result[keys[index]] = FLATNODE(field, flat)
            return result
          } else {
            return FLATNODE(field, flat)
          }
          // return result
        }, {})
      })
      return (output.length === 1) ? output[0] : output
    } else {
      // flag empty results
      return records
    }
  }
}
