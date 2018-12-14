import { AUTHORITY_ERROR } from '../config/status'

//捕获jwt->token验证错误 （401）
async function catchError(ctx, next) {
  console.log('流入----------------------')
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 200
      ctx.body = {
				status: AUTHORITY_ERROR,
				message: "如需访问，请先登录"
			}
    } else {
      throw err
    }
  })
}

export default catchError