import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow container mx-auto px-4">{children}</main>
      {/* <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <p className="text-white text-center">
            © {new Date().getFullYear()} BaePo - Best Pommes in Town! Allen Rechten vorenthalten.
          </p>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
};

export default Layout;
