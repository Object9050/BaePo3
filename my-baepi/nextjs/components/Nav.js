import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="bg-yellow-300">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-between py-4">
          <li>
            <Link href="/" className="text-black font-bold text-lg">
                Home
            </Link>
          </li>
          <li>
            <Link href="/pommes-tipps" className="text-black font-bold text-lg">
                Pommes-Tipps
            </Link>
          </li>
          <li>
            <Link href="/user" className="text-black font-bold text-lg">
                User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
