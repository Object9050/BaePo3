import Link from "next/link";
import { useState } from "react";
import { setToken, unsetToken } from "../lib/auth";

const Nav = () => {
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  // authentication function on login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sending a http POST-request to Strapi with username and password
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    setToken(data);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <nav
      className="
        flex-wrap
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
          <a>
            <img
              className="m-3"
              src="/logo.png"
              width={200}
              height={50}
              alt="BaePo Logo"
            />
          </a>
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
            <Link href="/"
              className="md:p-2 py-2 block hover:text-purple-400">
                Home
            </Link>
          </li>
          <li>
            <Link href"/pommesbuden"
              className
          </li>
        </ul>
      </div>
    </nav>
  );
};

const logout = (e) => {
  unsetToken();
};

export default Nav;
