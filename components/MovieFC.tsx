import { FunctionComponent } from "react";
import { Movie } from "../lib/movies";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";

export const MovieFC: FunctionComponent<{ movie: Movie, path: string }> = ({ movie, path }) => {
    const router = useRouter()
    return (<div key={movie._id} style={{ margin: '10px', border: '1px solid black', padding: '10px', borderRadius: '4px' }}>
        <div><label>Id:</label>
            <Link key={movie._id} href={`/${path}/${movie._id}`}>{movie._id}</Link></div>
        <div><label>Title:</label>{movie.title}</div>
        <div><label>Year:</label>{movie.year}</div>
        <div><label>Runtime:</label>{movie.runtime}</div>
        <div><label>Plot:</label>{movie.plot}</div>
        <div><label>Poster:</label>{movie.poster}</div>
        <Image src={movie.poster} width={100} height={100} />
        <div>
            <button onClick={() => router.back()}>Click here to go back</button>
        </div>
    </div>);
}