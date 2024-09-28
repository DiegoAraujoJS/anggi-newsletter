import { getAllEnabledSubscriptions } from '../database/queries/subscription';
import { generateNewsletterHtml } from './generateNewsletterHtml';
import {sendMail} from './sendMail';
import { getPost } from '../database/queries/posts';

export async function sendNewsletterMail({
  postId
}) {
  const post = await getPost(postId);
  const htmlContent = await generateNewsletterHtml(post);
  const subscribedMails = await getAllEnabledSubscriptions()

  if (subscribedMails.length > 1000) {
    throw new Error("Too many emails to send")
  }

  return await Promise.all(
    subscribedMails.map((user) => sendMail({
      to: user.email,
      subject: post.title,
      html: htmlContent
    }))
  )
}
