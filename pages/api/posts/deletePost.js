import { deletePost } from "../../../lib/database/queries/posts"

export default function handler (req, res) {
  return deletePost(req.body)
    .then(result => res.status(200).send(result))
    .catch(err => {
      console.log(err)
      return res.status(400).send("Hubo un error al borrar el post 😭")
    })
}
