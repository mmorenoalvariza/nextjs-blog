import { FunctionComponent } from "react";
import { Movie } from "../lib/movies";
import Image from 'next/image'
import Link from "next/link";

export const MovieFC: FunctionComponent<{ movie: Movie }> = ({ movie }) => {
    return (<div key={movie._id} style={{ margin: '10px', border: '1px solid black', padding: '10px', borderRadius: '4px' }}>
        <div><label>Id:</label>
            <Link key={movie._id} href={`/movies/${movie._id}`}>{movie._id}</Link></div>
        <div><label>Title:</label>{movie.title}</div>
        <div><label>Year:</label>{movie.year}</div>
        <div><label>Runtime:</label>{movie.runtime}</div>
        <div><label>Plot:</label>{movie.plot}</div>
        <div><label>Poster:</label>{movie.poster}</div>
        <Image src={movie.poster} width={100} height={100} />
    </div>);
}