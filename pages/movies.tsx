import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { connectToDatabase } from '../lib/mongodb'
import Link from 'next/link'
import Date from '../components/date'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import Image from 'next/image'

type Movie = {
    _id: string,
    title: string,
    year: number,
    runtime: number,
    plot: string,
    poster: string,

}

type Props = {
    movies: Movie[]
}

export async function getStaticProps() {
    let db = await connectToDatabase();
    let movieCollection = db.collection('mflix');
    const count = await movieCollection.countDocuments();
    /* const movies2 = (await (movieCollection.find({}, { limit: 10 })).toArray()).map((movie) => movie.toJSON()); */
    const movies = (await (movieCollection.find({ year: 1989 }, { limit: 10, sort: { runtime: 'desc' } })).toArray())
        .filter(movie => movie.runtime && movie.plot && movie.title && movie.year)
        .map(({ _id, title, year, runtime, plot }) => ({
            _id: _id.toString(), title, year, runtime, plot, poster: '/images/profile.jpg'
        })) as Movie[];

    return {
        props: {
            movies
        }
    }
}

export default function Movies({ movies }: Props) {

    const addMovie = (event: BaseSyntheticEvent) => {
        event.preventDefault();
        const { title, year, runtime, plot } = event.currentTarget;
        const movie = { title: title.value, year: parseInt(year.value), runtime: parseInt(runtime.value), plot: plot.value };
        fetch('api/hello', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>This is the movie list</p>
            </section>
            <section className={utilStyles.headingMd}>
                <p>Add movie</p>
                <form onSubmit={addMovie}>
                    <label>Title</label>
                    <input type={'text'} name='title' defaultValue={'New Movie'} />
                    <label>Year</label>
                    <input type={'number'} name='year' defaultValue={1989} />
                    <label>Runtime</label>
                    <input type={'number'} name='runtime' defaultValue={122} />
                    <label>Plot</label>
                    <input type={'text'} name='plot' defaultValue={'New Movie has a nice plot'} />
                    <button type='submit'>Add movie</button>
                </form>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Movies</h2>
                <div>{movies.map(movie => (
                    <div key={movie._id}>
                        <div>{movie._id}</div>
                        <div>{movie.title}</div>
                        <div>{movie.year}</div>
                        <div>{movie.runtime}</div>
                        <div>{movie.plot}</div>
                        <div>{movie.poster}</div>
                        <Image src={movie.poster} width={100} height={100} />
                    </div>
                ))}</div>
            </section>
        </Layout>
    )
}
