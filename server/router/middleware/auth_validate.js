import koaJwt from 'koa-jwt'
import { SECRET } from '../../../config/server'

//验证token有效性
const validateToken = koaJwt({
  secret: SECRET,
  getToken(ctx) {
    return ctx.cookies.get('token')
  },
  isRevoked() {
    return Promise.resolve(false)
  }
}).unless({
  path: [/\/api\/public/]
})

export default validateToken