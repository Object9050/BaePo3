import { useState } from "react";
import { fetcher } from "../lib/api";
import Layout from "../components/Layout";
import Pommesbuden from "../components/Pommesbuden";
import useSWR from "swr";
import { useFetchUser } from "../lib/authContext";

// Special Next.js function that pre-loads initial website data at build time.
// Comes into effect as fallbackData in PommesList() and is shown before data
// is requested by users.
export async function getStaticProps() {
  const pommesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden?pagination[page]=1&pagination[pageSize]=3&sort=title:ASC`
  );
  return {
    props: {
      pommes2: pommesResponse,
    },
  };
}

// Displays all the Pommesbuden with pagination buttons. Extracts 
// pommes2 prop from getStaticProps and uses it as fallbackData.
const PommesList = ({ pommes2 }) => {
  const { user } = useFetchUser();
  // Making pageIndex a variable through react's useState hook,
  // setting the starting page to page 1
  const [pageIndex, setPageIndex] = useState(1);
  // useSWR monitors changes in the data and re-renders parts of the page when data changes. 
  // It uses fetcher() to retrieve the data and allows for a fallbackData option.
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden?pagination[page]=${pageIndex}&pagination[pageSize]=3&sort=title:ASC`,
    fetcher,
    {
      fallbackData: pommes2,
    }
  );
  return (
    <Layout user={user}>
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tighter mb-4 mt-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 py-2">
          Pommesbuden
        </span>
      </h1>
      {/* Link to Pommesbuden component to show all Pommesbuden based on data fetched via useSWR */}
      <Pommesbuden pommes={data} />
      {/* Pagination Nav Buttons */}
      <div className="space-x-2 space-y-2">
        <button
          className={`md:p-2 rounded py-2 text-black p-2 ${
            pageIndex === 1 ? "bg-gray-300 text-white" : "bg-yellow-300"
          }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Zurück
        </button>
        <button
          className={`md:p-2 rounded py-2 text-black p-2 ${
            pageIndex === (data && data.meta.pagination.pageCount)
              ? "bg-gray-300 text-white"
              : "bg-yellow-300"
          }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Weiter
        </button>
        <span>
          {`${pageIndex} / ${data && data.meta.pagination.pageCount}`}
        </span>
      </div>
    </Layout>
  );
};

export default PommesList;
