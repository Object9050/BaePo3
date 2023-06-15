import { useState } from "react";
import { fetcher } from "../lib/api";
import Layout from "../components/Layout";
import Pommesbuden from "../components/Pommesbuden";
import useSWR from 'swr';
import { useFetchUser } from "../lib/authContext";

const PommesList = ({ pommes2 }) => {
  const { user, loading } = useFetchUser();
// Making pageIndex a variable through react's useState hook
// setting the starting page to page 1
  const [pageIndex, setPageIndex] = useState(1);
  // const { pommes2 } = useSWR(
  //   `${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden?pagination[page]=${pageIndex}&pagination[pageSize]=5`, 
  //   fetcher, 
  //   {
  //     fallbackData: pommes2,
  //     refreshInterval: 5000, // Verzögerung von 5 Sekunden
  //   }
  // );
    return (
      <Layout user={user}>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4 mt-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 py-2">
          Pommesbuden
          </span>
        </h1>
        <Pommesbuden pommes={pommes2} />
        {/* Pagination Nav Buttons */}
        <div className="space-x-2 space-y-2">
          <button
            className={`md:p-2 rounded py-2 text-black p-2 ${
              pageIndex === 1 ? 'bg-gray-300 text-white' : 'bg-yellow-300'
            }`}
            disabled={pageIndex === 1}
            onClick={() => setPageIndex(pageIndex -1)}
          >
            {' '}
            Zurück
          </button>
          <button
            className={`md:p-2 rounded py-2 text-black p-2 ${
              pageIndex === (pommes2 && pommes2.meta.pagination.pageCount)
               ? 'bg-gray-300 text-white' : 'bg-yellow-300'
            }`}
            disabled={pageIndex === (pommes2 && pommes2.meta.pagination.pageCount)}
            onClick={() => setPageIndex(pageIndex +1)}
          >
            Weiter
          </button>
          <span>{`${pageIndex} von ${
            pommes2 && pommes2.meta.pagination.pageCount
          }`}
          </span>
        </div>
      </Layout>
    );
};

export default PommesList;

export async function getStaticProps() {
  const pommesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden?pagination[page]=1&pagination[pageSize]=2`
  );
  return {
    props: {
      pommes2: pommesResponse,
    },
  };
}
