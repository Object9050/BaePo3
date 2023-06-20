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
import markdownToHtml from "../../lib/markdownToHtml";

export async function getServerSideProps({ req, params }) {
  // If code is executed in the browser-window getTokenFromLocalCookie
  // otherwise if code is executed on the server, getTokenFromServerCookie.
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);

  // Fetches the data for the specific Pommesbude based on the slug parameter
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

  // Converts the markdown description to HTML
  const description = await markdownToHtml(
    pommesResponse.data.attributes.description
  );

  return {
    props: {
      pommes: pommesResponse.data,
      photos: pommesResponse.data.attributes.photo.data,
      description,
      jwt: jwt ? jwt : "",
    },
  };
}

const Pommesbude = ({ pommes, jwt, description, photos }) => {
  const router = useRouter();
  const { user } = useFetchUser();
  const [review, setReview] = useState({
    value: "",
  });

  // Event handler for updating the review value
  const handleChange = (e) => {
    setReview({ value: e.target.value });
  };

  // Event handler for submitting the review
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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 py-2">
          {pommes.attributes.title}
        </span>
      </h1>

      {/* Renders the photos if available */}
      {photos ? (
        <div>
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={`${process.env.IMG_URL}${photo.attributes.url}`}
              alt={photo.attributes.alternativeText}
            />
          ))}
        </div>
      ) : (
        <div>Keine Fotos vorhanden</div>
      )}

      <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 py-2">
          Beschreibung
        </span>
      </h2>

      {/* Renders the description */}
      <div
        className="font-normal text-sm"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>

      {/* Renders the reviews section if user is logged in */}
      {user && (
        <>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 py-2">
              Bewertungen
            </span>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full text-sm px-3 py-2 text-gray-700 border border-2 border-orange-400 rounded-lg focus:outline-none"
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
            {/* Renders "Noch keine Bewertungen vorhanden." if there are no reviews */}
            {pommes.attributes.reviews.data.length === 0 && (
              <span>Noch keine Bewertungen vorhanden.</span>
            )}
            {/* Renders each review */}
            {pommes.attributes.reviews &&
              pommes.attributes.reviews.data.map((review) => {
                return (
                  <li key={review.id}>
                    <span className="text-orange-500 bg-clip-text">
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

export default Pommesbude;
