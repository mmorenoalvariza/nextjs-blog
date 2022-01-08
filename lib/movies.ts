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

export async function getAllMovieIds() {
    let db = await connectToDatabase();
    let movieCollection = db.collection(COLLECTION);
    const movies = (await (movieCollection.find({ year: 1989 }, { limit: 10, sort: { runtime: 'desc' } })).toArray())
        .filter(movie => movie.runtime && movie.plot && movie.title && movie.year)
        .map(({ _id, title, year, runtime, plot }) => ({
            _id: _id.toString(), title, year, runtime, plot, poster: '/images/profile.jpg'
        })) as Movie[];
    await new Promise(resolve => setTimeout(resolve, 6000));
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
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
    await new Promise(resolve => setTimeout(resolve, 6000));
    console.log('getMovie', movie);
    return {
        id,
        ...mapMovie(movie), _id: id
    }
}

export const mapMovie = ({ _id, title, year, runtime, plot }: DBMovie) => ({
    _id: _id.toString(), title, year, runtime, plot, poster: '/images/profile.jpg'
});