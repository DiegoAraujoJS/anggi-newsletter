import {MongoClient} from "mongodb"

const mongo = new MongoClient(process.env.MONGODB_URL)

export const connection = () => mongo.connect().then((client) => client.db("anggiBlog"))
