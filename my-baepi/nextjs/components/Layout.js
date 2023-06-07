import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow container mx-auto px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
