import koaJwt from 'koa-jwt'
import { SECRET } from '../../../config/server'

//验证token有效性
const validateToken = koaJwt({
  secret: SECRET,
  getToken(ctx) {
    return ctx.cookies.get('token')
  },
  isRevoked() {
    //此处添加校验逻辑
    return Promise.resolve(true)
  }
}).unless({
  path: [/\/api\/public/]
})

export default validateToken