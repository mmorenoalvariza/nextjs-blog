import { getAllMovieIds, getMovie } from '../../lib/movies'
import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'
import { FunctionComponent } from 'react';
/* 
export async function getStaticPaths() {
    const paths = await getAllMovieIds()
    return {
        paths,
        fallback: false
    }
} */

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const movie = await getMovie(params.id)
    await new Promise(resolve => setTimeout(resolve, 10000));
    return {
        props: {
            movie
        }
    }
}

export default function Movie({ movie }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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