import Link from "next/link";
import { useState } from "react";
import { setToken } from "../lib/auth";

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
};

export default Nav;
