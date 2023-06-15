import React from "react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import { UserProvider } from "../lib/authContext";

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>
    <Head>
      <title>BaePo - Best Pommes in Town!</title>
    </Head>

    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow container mx-auto px-4">
        <div
          className="
            flex
            justify-center
            items-center
            bg-white
            mx-auto
            w-2/4
            rounded-lg
            my-16
            p-16
          "
        >
          <div className="text-xl font-medium">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  </UserProvider>
);

export default Layout;
