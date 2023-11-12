import { connection } from "../connection"

export const updatePresentation = async (richText) => {
  const db = await connection()
  const presentation = db.collection('presentation')

  console.log(richText)
  const updateQuery = await presentation.updateOne({
      id: 1
    }, {$set: {
      richText
    }}, {upsert: true})

  return updateQuery
}

export const getPresentation = async () => {
  const db = await connection()
  const presentation = db.collection('presentation')

  return presentation.findOne({id:1})
}
