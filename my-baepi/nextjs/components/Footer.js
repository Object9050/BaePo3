import React from "react";

const Footer = () => {
  return (
    <footer className="text-lg md:text-xl font-medium bg-yellow-400 py-4">
      <div className="container mx-auto px-4">
        <p className="text-black text-center">
         © {new Date().getFullYear()} BæPo - Bæst Pommes in Town! Allen Rechten vorenthalten.
        </p>
      </div>
    </footer>
  )
}

export default Footer;