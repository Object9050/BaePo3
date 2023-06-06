import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-xl">Meine Next.js App</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4">{children}</main>
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <p className="text-white text-center">
            © {new Date().getFullYear()} Meine Next.js App. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
