import { expect } from 'chai'
import DataLoader from 'dataloader'
// import { batchFn } from '../../src/server/graphql/loaders'
import { Movie } from '../../src/server/graphql/modules/movie'

describe('[Types] Flow Types', () => {
  it('01: Can run tests with Flow Types', () => {
    let num: number = 5
    let arr: number[] = [1, 2, 3, 4]
    let sum = arr.reduce((p, c) => p + c, 0)
    expect(num * 2).to.equal(10)
    expect(sum).to.equal(10)
  })

  it('Can find "load" multiple students', async () => {
    let uuids = [
      '81271b40-32d7-11e6-a82d-ce8668049601',
      '8127de90-32d7-11e6-a82d-ce8668049601',
      '8128a1e0-32d7-11e6-a82d-ce8668049601',
      '81296533-32d7-11e6-a82d-ce8668049601',
      '812a2880-32d7-11e6-a82d-ce8668049601'
    ]

    let results = await Movie.load(uuids)
    expect(results).to.be.a('array')
    expect(results.length).to.equal(uuids.length)
  })

  it('Can use dataloader', async () => {
    let uuids = [
      '81271b40-32d7-11e6-a82d-ce8668049601',
      '8127de90-32d7-11e6-a82d-ce8668049601',
      '8128a1e0-32d7-11e6-a82d-ce8668049601',
      '81296533-32d7-11e6-a82d-ce8668049601',
      '812a2880-32d7-11e6-a82d-ce8668049601'
    ]

    let movies = new DataLoader(ids => Movie.load(ids))
    let results = await movies.loadMany(uuids)
    let movie = await movies.load('812a2880-32d7-11e6-a82d-ce8668049601')
    console.dir({results, movie}, {colors: true, depth: Infinity})
    expect(results).to.be.a('array')
    expect(movie).to.be.a('object')
    expect(results.length).to.equal(uuids.length)
  })
})
