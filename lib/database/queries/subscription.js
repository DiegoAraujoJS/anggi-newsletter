import { connection } from "../connection"

connection()
  .then(db => db.collection("subscriptions"))
  .then(collection => collection.createIndex({email: 1}, {unique: true}))
  .then((res) => console.log("index created", res))
  .catch((res) => console.log("error while creating index", res))


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const insertSubscription = async (newSubscription) => {
  // We first validate the form of the newSubscription
  const {name, email} = newSubscription

  if (typeof name !== "string" || (typeof email !== "string" || !emailRegex.test(email))) {
    throw new Error(`${name} has to be a string and ${email} has to be an email`)
  }
  const db = await connection()
  const subscriptions = db.collection("subscriptions")

  return subscriptions.insertOne(newSubscription)
}

export const getAllSubscriptions = async () => {
  const db = await connection();
  const collection = db.collection('subscriptions');
  const cursor = collection.find({}, { projection: { name: 1, email: 1, _id: 1 } });
  const subscriptions = await cursor.toArray();
  return subscriptions
}
