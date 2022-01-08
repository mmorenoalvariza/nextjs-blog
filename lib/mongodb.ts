import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {}

let cachedDb = null;

export async function connectToDatabase(): Promise<Db> {
    if (cachedDb) {
        return cachedDb;
    }
    if (!process.env.MONGODB_URI) {
        throw new Error('Please add your Mongo URI to .env.local')
    }
    const client = await MongoClient.connect(uri, options);
    const db = await client.db("mflix");
    //console.log('collections', await (await db.collection('movies')).find({ year: 1989 }).toArray());
    cachedDb = db;
    return db;
}