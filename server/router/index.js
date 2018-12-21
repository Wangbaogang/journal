import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import getRawBody from 'raw-body'

import middlewares from './middleware'
import userService from '../service/user'
import journalService from '../service/journal'
import { SECRET } from '../../config/server'
import sendMail from '../email/send'

const router = new Router({
  prefix: '/api'
})

const getEmail = token => {
  const decodedToken = jwt.verify(token, SECRET)
  console.log(decodedToken)
  const { email } = decodedToken
  return email
}

router.use(middlewares.catch_401)
router.use(middlewares.auth_validate)

//新建日志
router.post('/createJournal', async function createJournal(ctx, next) {
  await next()
  ctx.type = 'application/json;charset=UTF-8'
  ctx.status = 200
  const body = await getRawBody(ctx.req) //buffer
  const bodyObj = JSON.parse(body.toString())
  const token = ctx.cookies.get('token')
  const email = getEmail(token)
  await journalService.createJournal(email, bodyObj)
  ctx.body = {
    success: true
  }
})

//编辑日志
router.post('/updateJournal', async function createJournal(ctx, next) {
  await next()
  ctx.type = 'application/json;charset=UTF-8'
  ctx.status = 200
  const body = await getRawBody(ctx.req) //buffer
  const bodyObj = JSON.parse(body.toString())
  const token = ctx.cookies.get('token')
  const email = getEmail(token)
  await journalService.updateJournal(email, bodyObj)
  ctx.body = {
    success: true
  }
})

router.post('/findJournalById', async function findJournalById(ctx, next) {
  await next()
  ctx.type = 'application/json;charset=UTF-8'
  ctx.status = 200
  const body = await getRawBody(ctx.req) //buffer
  const bodyObj = JSON.parse(body.toString())
  const token = ctx.cookies.get('token')
  if (!token) {
    ctx.body = {
      success: true,
      data: null
    }
  } else {
    const email = getEmail(token)
    const journal = await journalService.findJournalById(
      Object.assign(bodyObj, { email })
    )
    console.log(journal, 'findJournalById')
    ctx.body = {
      success: true,
      data: journal
    }
  }
})

//查找用户日志
router.post('/findJournals', async function findJournals(ctx, next) {
  await next()
  ctx.type = 'application/json;charset=UTF-8'
  ctx.status = 200
  const token = ctx.cookies.get('token')
  if (!token) {
    ctx.body = {
      success: true,
      data: []
    }
  } else {
    const email = getEmail(token)
    const journlas = await journalService.findJournalsByEmail(email)
    ctx.body = {
      success: true,
      data: journlas
    }
  }
})

//发送激活邮件
router.post('/public/sendActiveMail', async function sendMailAsync(ctx, next) {
  await next()
  ctx.type = 'application/json;charset=UTF-8'
  ctx.status = 200
  const body = await getRawBody(ctx.req) //buffer
  const bodyObj = JSON.parse(body.toString())
  const { email } = bodyObj
  console.log(email, 'ea')
  ctx.body = {
    success: true
  }
  sendMail({
    from: 'Journal <journal.ok@foxmail.com>',
    subject: '激活',
    to: email,
    text: '您正在注册Journal，如确认请点击如下链接：http://www.baidu.com'
  })
})

router.post('/public/login', async function login(ctx, next) {
  await next()
  ctx.type = 'application/json;charset=UTF-8'
  ctx.status = 200
  const body = await getRawBody(ctx.req)
  const bodyObj = JSON.parse(body.toString())
  const { email, password } = bodyObj
  const existUser = await userService.findUserByEmail(email)

  if (existUser && existUser.password === password) {
    const token = jwt.sign(
      {
        email,
        password,
        time: +new Date()
      },
      SECRET,
      {
        expiresIn: '1h'
      }
    )
    ctx.cookies.set('token', token, {
      httpOnly: false
    })
    ctx.body = {
      success: true,
      data: existUser
    }
  } else {
    ctx.body = {
      success: false,
      message: '邮箱或密码有误'
    }
  }
})

//退出登录
router.post('/logout', async function logout(ctx, next) {
  await next()
  ctx.type = 'application/json;charset=UTF-8'
  ctx.status = 200
  ctx.cookies.set('token', '', { maxAge: -1 })
  ctx.body = {
    success: true
  }
})

// 注册账号
router.post('/public/register', async function register(ctx, next) {
  await next()
  ctx.type = 'application/json;charset=UTF-8'
  ctx.status = 200
  const body = await getRawBody(ctx.req)
  const bodyObj = JSON.parse(body.toString())
  //此处未来补充密码非对称加密解密逻辑
  const { email, userName, password } = bodyObj
  const existUser = await userService.findUserByEmail(email)
  console.log(existUser, 'existUser')
  if (existUser) {
    ctx.body = {
      success: false,
      message: '您的邮箱已注册过，可直接登陆'
    }
    return
  }
  const info = await userService.addUnActiveUser({
    email,
    password
  })
  console.log(info, 'userInfo')
  //签发token
  const token = jwt.sign(
    {
      email,
      password,
      time: +new Date()
    },
    SECRET,
    {
      expiresIn: '1h'
    }
  )
  ctx.cookies.set('token', token, {
    httpOnly: false
  })
  ctx.body = {
    success: true
  }
})

export default router
