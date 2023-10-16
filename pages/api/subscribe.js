import { insertSubscription } from "../../lib/database/queries/subscription"

export default function handler (req, res) {
  console.log(req.body)
  return insertSubscription(req.body)
    .then(res.send)
    .catch(err => {
      console.log(err)
      return res.status(400).send(err.code === 11000 ? `El mail ${req.body.email} ya está subscripto 😘` : "Hubo un error al subscribirte 😭")
    })
}
