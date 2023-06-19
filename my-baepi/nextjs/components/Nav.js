import Link from "next/link";
import { useState } from "react";
import { setToken, unsetToken } from "../lib/auth";
import { fetcher } from "../lib/api";
import { useUser } from "../lib/authContext";

const Nav = () => {
  // React hook 'useState' declares variable 'data', initialises
  // it with empty username (identifier) and password. Also
  // creates 'setData' function which enables later 'data' alteration.
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const { user, loading } = useUser();

  // authentication event-handler function for the login of a user
  const handleSubmit = async (e) => {
    // prevents automatic reload of page after form submit
    e.preventDefault();
    // Sending a http POST-request to Strapi with username and password
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    setToken(responseData);
  };

  // Event-handler function for user input in username or password fields
  const handleChange = (e) => {
    // creates a copy of 'data' and replaces the current values
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const logout = (e) => {
    unsetToken();
  };

  return (
    <nav
      className="
        flex flex-wrap
        items-center
        justify-between
        w-full
        py-4
        md:py-0
        px-4
        text-lg text-gray-700
        bg-white
      "
    >
      <div>
        <Link href="/">
          <img
            className="m-3"
            src="/logo.png"
            width={100}
            height={50}
            alt="BaePo Logo"
          />
        </Link>
      </div>
      <div
        className="hidden w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          className="
            pt-4
            text-base text-gray-700
            md:flex
            md:justify-between
            md:pt-0 space-x-2
          "
        >
          <li>
            <Link href="/" className="md:p-2 py-2 block hover:text-orange-400">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/pommesbuden"
              className="md:p-2 py-2 block hover:text-orange-400"
            >
              Pommesbuden
            </Link>
          </li>
          {!loading &&
            // Inline conditional rendering. If user is logged in, show 'Profil' item
            (user ? (
              <li>
                <Link
                  href="/profile"
                  className="md:p-2 py-2 block hover:text-orange-400"
                >
                  Profil
                </Link>
              </li>
            ) : (
              ""
            ))}
          {!loading &&
            // Inline conditional rendering. If user is logged in, show 'Logout' item
            (user ? (
              <li>
                <a
                  className="md:p-2 py-2 block hover:text-orange-400"
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
              </li>
            ) : (
              ""
            ))}
          {!loading && !user ? (
            <>
              <li>
                <form onSubmit={handleSubmit} className="form-inline">
                  <input
                    type="text"
                    name="identifier"
                    onChange={handleChange}
                    placeholder="Username"
                    className="md:p-2 form-input py-2 rounded mx-2"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Passwort"
                    className="md:p-2 form-input py-2 rounded mx-2"
                    required
                  />

                  <button
                    className="md:p-2 rounded py-2 text-black bg-yellow-300 p-2"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </li>
              <li>
                <Link
                  href="/register"
                  className="md:p-2 py-2 block hover:text-orange-400 text-black"
                >
                  Registrieren
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
