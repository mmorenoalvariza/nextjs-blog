import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { method, body } = req;
    if ('POST' === method) {
        const db = await connectToDatabase();
        const newMovie = await db.collection('mflix').insertOne(body);
        console.log(body, newMovie);

        res.status(201).json(newMovie);
    } else {
        res.status(200).json({ text: 'Hello' })
    }
}