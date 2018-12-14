import nodemailer from 'nodemailer'
import { EMAIL_AUTH_CODE, EMAIL_ACCOUNT, EMAIL_HOST, EMAIL_HOST_PORT } from '../../config/email'

const config = {
	host: EMAIL_HOST,
	port: EMAIL_HOST_PORT,
	auth: {
		user: EMAIL_ACCOUNT,
		pass: EMAIL_AUTH_CODE 
	}
}
const transporter = nodemailer.createTransport(config)

/**
 * @param {object} mail
 * @description 参数包括
 * mail.from 发件人 
 * mail.subject 主题
 * mail.to 收件人 
 * mail.text 邮件内容，html格式
 */
export default async function(mail) {
	return new Promise((resolve, reject) => {
		transporter.sendMail(mail, (error, info) => {
			if(error) {
				console.log(error);
				reject(error)
			} else {
				console.log('mail sent:', info.response);
				resolve(info)
			}
		})
	})
}
