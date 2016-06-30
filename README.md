relay-starter: Relay/GraphQL Starter
===========================

GraphQL server using node / express and written in ES6 (ES2015) and ES7 (ES2016).

I built this starter because there are limited examples I've found of Relay flavoured GraphQL backends built in a modular manner. Most examples are of Todo apps with simple one file schemas. I was getting into undefined nodes OR cyclical node errors until i discovered some interesting approaches here: [Abstract type resolution for node definitions](https://github.com/graphql/graphql-relay-js/issues/25).

Getting Started
--------

```sh
npm i

```

create a file in the project root called `.env` and within it set environment variables `NEO4J_USER` and `NEO4J_PASS`. Note you can also edit database credentials in the file `src/lib/db.js`

example `.env` file

```sh
NODE_ENV=development
NEO4J_USER=neo4j
NEO4J_PASS=neopass
DEBUG=api:*
```

to start, run:
```sh
npm start
```
To run tests:

```sh
npm test
```

Database
--------
Sample database is the Neo4j Movie database found [here](http://neo4j.com/developer/example-data/). This starter kit is using Neo4j 3.0 but feel free to swap in your own database.

Install
-------

Setup you Neo4j database as per above running the Movie sample then the following instructions

```sh
#clone the repo
git clone https://github.com/Pepeye/relay-starter.git
cd relay-starter
npm install

# first ensure Neo4j is running (port 7474), then:
npm start
```

Once running visit:
* http://localhost:3000 - running app
* http://localhost:4000/graphql - proxy to graphiql interface to test graphql queries

Stack
--------
* [React](https://github.com/facebook/react)
* [Relay](https://github.com/facebook/relay)
* [GraphQL](https://github.com/graphql/)
  * [graphql-js](https://github.com/graphql/graphql-js)
  * [express-graphql](https://github.com/graphql/express-graphql)
* [Express](https://github.com/strongloop/express/)
* [Neo4j](https://github.com/neo4j/neo4j)
  * [neo4j/neo4j-javascript-driver](https://github.com/neo4j/neo4j-javascript-driver) (*Official Driver*)
  * [node-neo4j](https://github.com/thingdom/node-neo4j/tree/v2#readme) (`^2.0.0-RC2`) *dropped in favour of official driver*
* ES6/ES7
  * ES6 goodness
  * async/await
  * rest & spread operators
* [Mocha](https://github.com/mochajs/mocha)
  * Mocha w/ chai, and chai-as-promised
* [supertest](https://github.com/visionmedia/supertest)
  * [supertest-as-promised](https://github.com/WhoopInc/supertest-as-promised)
* [Babel](https://github.com/babel/babel) (`^6.3.0`)
  * [babel-preset-node5](https://github.com/leebenson/babel-preset-node5)
  * [babel-preset-stage-0](https://babeljs.io/docs/plugins/preset-stage-0)
* [ESLint](http://eslint.org)
  * Uses [Standard Style](https://github.com/feross/standard) by default, but you're welcome to change this!
  * Includes separate test-specific `.eslintrc` to work with Mocha and Chai
* [better-npm-run](https://github.com/benoror/better-npm-run)


TODO
--------

- [x] Introduce Relay flavoured (connections/nodes) GraphQL
- [x] Move GraphQL code back into previous modules/models
- [ ] Add example mutation
- [ ] Add custom GraphQL scalar types
- [x] Add typing with flow, example typed test
- [x] Setup karma test runner with coverage and mocha for studentsPerClass
- [ ] Testing: introduce stubs
