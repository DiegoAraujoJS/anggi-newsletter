import { insertSubscription } from "../../lib/database/queries/subscription"

export default function handler (req, res) {
  return insertSubscription(req.body)
    .then(res.send)
    .catch(err => res.status(400).send(err))
}
