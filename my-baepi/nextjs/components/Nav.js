import Link from "next/link";
import { useState } from "react";
import { setToken, unsetToken } from "../lib/auth";
import { fetcher } from '../lib/api';
import { useUser } from "../lib/authContext";


const Nav = () => {
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const { user, loading } = useUser();

  // authentication function on login submit
  const handleSubmit = async (e) => {
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
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
      
    const logout = (e) => {
      unsetToken();
    };

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
        <Link href="/" passHref>
            <img
              className="m-3"
              src="/logo.png"
              width={100}
              height={50}
              alt="BaePo Logo"
            />
        </Link>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        className="h-6 w-6 cursor-pointer md:hidden block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        /> 
      </svg>

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
            <Link href="/"
              className="md:p-2 py-2 block hover:text-orange-400">
                Home
            </Link>
          </li>
          <li>
            <Link href="/pommesbuden"
              className="md:p-2 py-2 block hover:text-orange-400">
                Pommesbuden
            </Link>
          </li>
          {!loading &&
            (user ? (
              <li>
                <Link href="profile"
                  className="md:p-2 py-2 block hover:text-orange-400">
                    Profile
                </Link>
              </li>
            ) : (
              ''
            ))}
          {!loading &&
            (user ? (
              <li>
                <a
                  className="md:p-2 py-2 block hover:text-orange-400"
                  onClick={logout}
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </a>
              </li>
            ) : (
              ''
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
                <Link href="/signup"
                  className="md:p-2 py-2 block hover:text-orange-400 text-black">
                    Sign-Up
                </Link>
              </li>
            </>
          ) : (
            ''
          )}
        </ul>
      </div>
    </nav>
  );
};


export default Nav;
