import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../lib/mongodb";
import { COLLECTION } from "../../lib/movies";

export default async function handler(req, res) {
    const { method, body, query } = req;
    const id = query.id as string;
    const db = await connectToDatabase();
    const collection = db.collection(COLLECTION);
    switch (method) {
        case 'POST': {
            const newMovie = await collection.insertOne(body);
            res.status(201).json(newMovie);
        }
        case 'GET': {
            res.status(200).json(await collection.findOne({ _id: new ObjectId(id) }))
        }
        case 'PUT': {
            await collection.replaceOne({ _id: new ObjectId(id) }, body);
            res.status(201).json(await collection.findOne({ _id: new ObjectId(id) }))
        }
    }
};