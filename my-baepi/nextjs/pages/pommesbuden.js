import { fetcher } from "../../lib/api";
import Layout from "../components/Layout";
import Pommesbuden from "../components/Pommesbuden";

const PommesList = ({ pommes }) => {
  return (
    <Layout>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4 mt-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Pommesbuden!
        </span>
      </h1>
      <Pommesbuden pommes={pommes} />
    </Layout>
  );
};

export default PommesList;

export async function getStaticProps() {
  const pommesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden`
  );
  console.log(pommesResponse);
  return {
    props: {
      pommes: pommesResponse,
    },
  };
}
