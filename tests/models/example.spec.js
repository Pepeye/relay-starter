import { expect } from 'chai'

describe('[Types] Flow Types', () => {
  it('01: Can run tests with Flow Types', () => {
    let num: number = 5
    let arr: [] = [1, 2, 3, 4]
    let sum = arr.reduce((p, c) => p + c, 0)
    expect(num * 2).to.equal(10)
    expect(sum).to.equal(10)
  })
})
