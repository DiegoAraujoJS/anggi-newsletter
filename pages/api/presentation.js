import { updatePresentation } from "../../lib/database/queries/presentation"

export default async function handler (req, res) {
  if (req.headers.authorization !== process.env.ADMIN_PASSWORD) return res.status(401).send("No estás autorizado a hacer esto 😠")
  console.log(req.body)
  const {body} = req.body
  return updatePresentation(body)
    .then(() => res.send("Presentación actualizada 😃"))
    .catch(err => {
      console.log(err)
      return res.status(400).send( "Hubo un error al actualizar la presentación 🙃")
    })
}
