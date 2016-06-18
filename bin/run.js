require('babel-register')

var RUN_TASK = process.env.RUN_TASK
require(`../build/tasks/${RUN_TASK}`)
