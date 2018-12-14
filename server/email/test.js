import send from './send'

export default async function() {
  return await send({
    from: 'Journal <journal.ok@foxmail.com>',
    subject: '激活',
    to: '193205700@qq.com',
    text: '啊哈哈2<h1>22</h1>http://www.baidu.com'
  })
}
