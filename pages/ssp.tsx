import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { COLLECTION, DBMovie, getAllMovies, mapMovie, Movie } from '../lib/movies'
import { connectToDatabase } from '../lib/mongodb'
import Link from 'next/link'
import Date from '../components/date'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { MovieFC } from '../components/Movie'
import { getAllPostIds } from '../lib/posts'

type Props = {
    movies: Movie[]
}

export async function getServerSideProps({ res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=20, stale-while-revalidate=59'
    )
    const movies = await getAllMovies();
    await new Promise(resolve => setTimeout(resolve, 4000));
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

            <h2>Movies {movies.length}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>{movies.map(movie => (
                <MovieFC key={movie._id} movie={movie} />
            ))}</div>

        </Layout>
    )
}
