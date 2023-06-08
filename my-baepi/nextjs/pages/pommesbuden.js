import { useState } from "react";
import { fetcher } from "../lib/api";
import Layout from "../components/Layout";
import Pommesbuden from "../components/Pommesbuden";
import useSWR from 'swr';

const PommesList = ({ pommes }) => {
// Making pageIndex a variable through react's useState hook
// setting the starting page to page 1
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden?pagination[page]=${pageIndex}&pagination[pageSize]=1`, 
    fetcher, 
    {
      fallbackData: pommes,
    }
  );
    return (
      <Layout>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4 mt-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Pommesbuden!
          </span>
        </h1>
        <Pommesbuden pommes={data} />
        {/* Pagination Nav Buttons */}
        <div className="space-x-2 space-y-2">
          <button
            className={`md:p-2 rounded py-2 text-black text-white p-2 ${
              pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
            }`}
            disabled={pageIndex === 1}
            onClick={() => setPageIndex(pageIndex -1)}
          >
            {' '}
            Zurück
          </button>
          <button
            className={`md:p-2 rounded py-2 text-black text-white p-2 ${
              pageIndex === (data && data.meta.pagination.pageCount)
               ? 'bg-gray-300' 
               : 'bg-blue-400'
            }`}
            disabled={pageIndex === (data && data.meta.pagination.pageCount)}
            onClick={() => setPageIndex(pageIndex +1)}
          >
            Weiter
          </button>
          <span>{`${pageIndex} von ${
            data && data.meta.pagination.pageCount
          }`}
          </span>
        </div>
      </Layout>
    );
};

export default PommesList;

export async function getStaticProps() {
  const pommesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden?pagination[page]=1&pagination[pageSize]=1`
  );
  console.log(pommesResponse);
  return {
    props: {
      pommes: pommesResponse,
    },
  };
}
