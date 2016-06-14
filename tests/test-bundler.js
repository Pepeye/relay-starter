// import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
// import chaiEnzyme from 'chai-enzyme'

chai.use(sinonChai)
chai.use(chaiAsPromised)
// chai.use(chaiEnzyme())

// global.chai = chai
// global.sinon = sinon
// global.expect = chai.expect
// global.should = chai.should()

// R E Q U I R E   T E S T S

// for use with karma-webpack-with-fast-source-maps
// const __karmaWebpackManifest__ = [] // eslint-disable-line
// const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path)

// // S P E C S   |   require all `tests/**/*.spec.js`
// const specsContext = require.context('./', true, /\.spec\.js$/)

// // only run tests that have changed after the first pass.
// const specsToRun = specsContext.keys().filter(inManifest)
// ;(specsToRun.length ? specsToRun : specsContext.keys()).forEach(specsContext)

// // T E S T S   |   require all `tests/**/*.test.js`
// const testsContext = require.context('../src/', true, /\.test\.js$/)

// // only run tests that have changed after the first pass.
// const testsToRun = testsContext.keys().filter(inManifest)
// ;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)

// // require all `src/**/*.js` except for `main.js` (for isparta coverage reporting)
// const componentsContext = require.context('../src/', true, /^((?!main).)*\.js$/)

// componentsContext.keys().forEach(componentsContext)

let __karmaWebpackManifest__ = []
let inManifest = (path) => (__karmaWebpackManifest__.indexOf(path) >= 0)

let specsContext = require.context('./', true, /\.spec\.js$/)
let runnable = specsContext.keys().filter(inManifest)

if (!runnable.length) {
  runnable = specsContext.keys()
}

runnable.forEach(specsContext)
