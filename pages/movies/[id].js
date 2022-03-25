import Head from 'next/head'
import Layout from '../../components/layout'
import { MovieFC } from '../../components/MovieFC'
import { getAllMovieIds, getMovie } from '../../lib/movies'

export async function getStaticPaths() {
    const paths = await getAllMovieIds()
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const movie = await getMovie(params.id)
    return {
        props: {
            movie
        },
        revalidate: 10,
    }
}

export default function ById({ movie }) {
    console.log('movie', movie);
    return (
        <Layout>
            <Head>
                <title>{movie.title}</title>
            </Head>
            <article>
                <MovieFC movie={movie} path='movies' />
            </article>
        </Layout>
    )
}