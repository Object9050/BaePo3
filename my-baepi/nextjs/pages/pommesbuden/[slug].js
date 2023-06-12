import { fetcher } from "../../lib/api";
import Layout from "../../components/Layout";
import { useFetchUser } from "../../lib/authContext";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUserFromLocalCookie,
} from "../../lib/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const Pommesbude = ({ pommes, jwt }) => {
  const router = useRouter();
  const { user, loading } = useFetchUser();
  const [review, setReview] = useState({
    value: "",
  });

  const handleChange = (e) => {
    setReview({ value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            review: review.value,
            reviewer: getUserFromLocalCookie(),
            pommesbude: pommes.id,
          },
        }),
      });
      router.reload();
    } catch (error) {
      console.error("Fehler bei der Anfrage", error);
    }
  };

  return (
    <Layout user={user}>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          {pommes.attributes.title}
        </span>
      </h1>
      {/* <p>
        Beschreibung{" "}
        <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          {pommes.attributes.Description}
        </span>
      </p> */}
      {/* <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Plot
        </span>
      </h2> */}
      {/* <div
        className="tracking-wide font-normal text-sm"
        dangerouslySetInnerHTML={{ __html: plot }}
      ></div> */}
      {user && (
        <>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
              Bewertungen
            </span>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full text-sm px-3 py-2 text-gray-700 border border-2 border-teal-400 rounded-lg focus:outline-none"
                rows="4"
                value={review.value}
                onChange={handleChange}
                placeholder="Füge deine Bewertung hinzu"
              ></textarea>
              <button
                className="md:p-2 rounded py-2 text-black bg-yellow-300 p-2"
                type="submit"
              >
                Bewertung hinzufügen
              </button>
            </form>
          </h2>
          <ul>
            {pommes.attributes.reviews.data.length === 0 && (
              <span>Noch keine Bewertungen vorhanden.</span>
            )}
            {pommes.attributes.reviews &&
              pommes.attributes.reviews.data.map((review) => {
                return (
                  <li key={review.id}>
                    <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                      {review.attributes.reviewer}
                    </span>{" "}
                    sagt: &quot;{review.attributes.review}&quot;
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </Layout>
  );
};

export async function getServerSideProps({ req, params }) {
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const { slug } = params;
  const pommesResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/pommesbuden/${slug}?populate=*`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  return {
    props: {
      pommes: pommesResponse.data,
      jwt: jwt ? jwt: '',
    },
  };
}

export default Pommesbude;
