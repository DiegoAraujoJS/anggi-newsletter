import { insertPost } from "../../../lib/database/queries/posts"
import { sendNewsletterMail } from "../../../lib/mail/sendNewsletterMail"

export default function handler (req, res) {
  if (req.cookies.adminPassword !== process.env.ADMIN_PASSWORD) return res.status(401).send("No estás autorizado a hacer esto 😠")
  return insertPost(req.body)
    .then(result => {
      return sendNewsletterMail({postId: result.id}).then(() => result)
    })
    .then(result => res.status(200).send(result))
    .catch(err => {
      console.log(err)
      return res.status(400).send("Hubo un error al postear 😭")
    })
}
