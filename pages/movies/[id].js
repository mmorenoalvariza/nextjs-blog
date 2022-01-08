import { getAllMovieIds, getMovie } from '../../lib/movies'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'

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

export default function Movie({ movie }) {
    return (
        <Layout>
            <Head>
                <title>{movie.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{movie.title}</h1>
                <div>{movie.plot}</div>
                <div className={utilStyles.lightText}>
                    {movie.year}
                </div>
                <div>{movie.runtime}</div>
            </article>
        </Layout>
    )
}