import { connectToDatabase } from "../../lib/mongodb";
import { COLLECTION } from "../../lib/movies";

export default async function handler(req, res) {
    const { method, body } = req;
    const db = await connectToDatabase();
    if ('POST' === method) {

        const newMovie = await db.collection(COLLECTION).insertOne(body);

        res.status(201).json(newMovie);
    } else {
        res.status(200).json(await db.collection(COLLECTION).count({ year: 1989, runtime: 81 }))
    }
}