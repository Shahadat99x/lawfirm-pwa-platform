import nodemailer from 'nodemailer'
import { serverEnv } from '@/lib/env'

const transporter = nodemailer.createTransport({
  host: serverEnv.SMTP_HOST,
  port: parseInt(serverEnv.SMTP_PORT || '465'),
  secure: serverEnv.SMTP_SECURE === 'true',
  auth: {
    user: serverEnv.SMTP_USER,
    pass: serverEnv.SMTP_PASS,
  },
})

interface SendMailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendMail({ to, subject, html, text }: SendMailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"LexNova Legal" <${serverEnv.SMTP_USER}>`,
      to,
      subject,
      text: text || html.replace(/<[^>]*>?/gm, ''), // Fallback plain text
      html,
    })
    console.info(`Email sent to ${to}: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}
