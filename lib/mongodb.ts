import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {}

let cachedDb = null;

export async function connectToDatabase(): Promise<Db> {
    if (cachedDb) {
        return cachedDb;
    }
    const client = await MongoClient.connect(uri, options);
    const db = await client.db("mflix");

    cachedDb = db;
    return db;
}