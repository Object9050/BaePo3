import { fetcher } from '../../lib/api';
import Layout from '../components/Layout'

const PommesList = () => {
    <Layout>
        <h1>Pommesbuden!</h1>
    </Layout>
}

export default PommesList;

export async function getStaticProps() {
    const pommesResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden`);
    console.log(pommesResponse);
    return {
        props: {
            pommes: pommesResponse
        }
    }
}   