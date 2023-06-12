import { fetcher } from "../../lib/api";
import Layout from "../../components/Layout";
import { useFetchUser } from "../../lib/authContext";

const Pommesbude = ({ pommes }) => {
    const { user, loading } = useFetchUser();
    return (
        <Layout user={user}>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
                    {pommes.attributes.title}
                </span>
            </h1>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    const { slug } = params;
    const pommesResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden/${slug}`);
    return {
        props: {
            pommes: pommesResponse.data
        }
    }
}

export default Pommesbude;