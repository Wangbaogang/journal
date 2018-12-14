require('babel-register')()

// send email
let EmailTest = require('./server/email/test').default

let asyncFunctionList = [EmailTest]

//顺序执行任务，成功后执行下一个
let queue = async function(i = 0) {
  let fn = asyncFunctionList[i]
  if (!fn) return
  await fn()
  console.log(`第${++i}个test任务执行成功`)
  queue(++i)
}

queue()
