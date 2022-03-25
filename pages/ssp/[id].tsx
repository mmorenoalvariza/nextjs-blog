import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import { MovieFC } from '../../components/MovieFC';
import { getMovie } from '../../lib/movies';

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=20, stale-while-revalidate=59'
    )
    const movie = await getMovie(params.id)
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
        props: {
            movie
        }
    }
}

export default function ById({ movie }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <Head>
                <title>{movie.title}</title>
            </Head>
            <article>
                <MovieFC movie={movie} path='ssp' />
            </article>
        </Layout>
    )
}