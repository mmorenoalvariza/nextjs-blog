import { MongoAPIError, ObjectId, WithId } from 'mongodb';
import { connectToDatabase } from './mongodb'

export type Movie = {
    _id: string,
    title: string,
    year: number,
    runtime: number,
    plot: string,
    poster: string,

}
export type DBMovie = {
    _id: ObjectId,
    title: string,
    year: number,
    runtime: number,
    plot: string,
    poster: string,

}
export const COLLECTION = 'movies';

export const getAllMovies = async () => {
    let db = await connectToDatabase();
    let movieCollection = db.collection(COLLECTION);
    const dbmovies = (await (movieCollection.find({ year: 1989 }, { limit: 300, sort: { runtime: 'desc' } })).toArray()) as DBMovie[];
    const movies = dbmovies.filter(movie => movie.runtime && movie.plot && movie.title && movie.year)
        .map(mapMovie) as Movie[];
    await new Promise(resolve => setTimeout(resolve, 6000));
    return movies;
}

export async function getAllMovieIds() {
    const movies = await getAllMovies();

    return movies.map(({ _id }) => {
        return {
            params: {
                id: _id
            }
        }
    })
}

export async function getMovie(id) {
    let db = await connectToDatabase();
    let movieCollection = db.collection(COLLECTION);
    const _id = new ObjectId(id);

    const movie = (await movieCollection.findOne({ _id })) as DBMovie;
    await new Promise(resolve => setTimeout(resolve, 20));
    return {
        id,
        ...mapMovie(movie), _id: id
    }
}

export const mapMovie = ({ _id, title, year, runtime, plot }: DBMovie) => ({
    _id: _id.toString(), title, year, runtime, plot, poster: '/images/profile.jpg'
});