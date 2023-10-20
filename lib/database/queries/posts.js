import { connection } from "../connection"

const normalizeString = (str) => {
  return str.toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/\s+/g, '-');
};

export const getAllPostsTitles = async () => {
  const db = await connection();
  const collection = db.collection('posts');
  const cursor = collection.find({}, { projection: { title: 1, createdAt: 1, id: 1, _id: 0 } });
  const posts = await cursor.toArray();
  return posts
}

export const getPost = async (id) => {
  const db = await connection();
  const posts = db.collection('posts');
  return posts.findOne({id}, {projection: {_id: 0}})
}

export const insertPost = async (post) => {
  // We first validate the form of the newSubscription
  const {title, subTitle, body, date } = post

  const id = normalizeString(title)
  const d = new Date(date)
  if (typeof title !== "string" || typeof body !== "string" || isNaN(d.getTime())) {
    throw new Error(`${title} and ${body} have to be strings. "date" has to be a date`)
  }

  const db = await connection()
  const posts = db.collection("posts")

  return posts.insertOne({...post, id, createdAt: d.toISOString()}).then(result => ({...result, id }))
}

export const deletePost = async (id) => {
  const db = await connection();
  const posts = db.collection('posts');
  return posts.deleteOne({id})
}
