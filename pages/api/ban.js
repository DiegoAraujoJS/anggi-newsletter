import { changeSubscriptionStatus } from "../../lib/database/queries/subscription"

export default function handler (req, res) {
  if (req.cookies.adminPassword !== process.env.ADMIN_PASSWORD) return res.status(401).send("No estás autorizado a hacer esto 😠")
  const { email } = req.body
  return changeSubscriptionStatus(email)
    .then(res.send)
    .catch(err => {
      console.log(err)
      return res.status(400).send("Hubo un error al suspender la suscripción 😭")
    })
}
