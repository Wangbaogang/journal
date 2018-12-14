import Koa from 'koa'
import { PORT } from '../config/server'
import router from './router'

const app = new Koa()
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT)

export const init = () => {
  console.log(`server is running on port:${PORT} successfully`)
}
