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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 py-2">
          {pommes.attributes.title}
        </span>
      </h1>

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

      <div
        className="font-normal text-sm"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>

      {/* Display address and Google Maps link */}
      {pommes.attributes.address && (
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 py-2">
              Adresse
            </span>
          </h2>
          <div className="font-normal text-sm">
            <a
              href={pommes.attributes.gmaps}
              target="_blank"
              rel="noopener noreferrer"
            >
              {pommes.attributes.address}
            </a>
          </div>
        </div>
      )}
      {user && (
        <>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 py-2">
              Bewertungen
            </span>
          </h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full text-sm px-3 py-2 text-gray-700 border border-2 border-orange-400 rounded-lg focus:outline-none"
              rows="3"
              value={review.value}
              onChange={handleChange}
              placeholder="Füge deine Bewertung hinzu"
            ></textarea>
            <button
              className="md:p-2 rounded py-2 text-black bg-yellow-300 p-2 mb-4"
              type="submit"
            >
              Bewertung hinzufügen
            </button>
          </form>
          <ul>
            {pommes.attributes.reviews.data.length === 0 && (
              <span>Noch keine Bewertungen vorhanden.</span>
            )}
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
