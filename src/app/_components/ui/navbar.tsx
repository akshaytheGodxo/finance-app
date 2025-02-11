'use client';

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-[#2b2b2b] w-full h-24 flex items-center border-b border-black px-4 md:px-12">
            <span className="font-poppins text-white text-3xl">
                <h3>Wallet</h3>
            </span>

            {/* Hamburger icon for mobile */}
            <div className="text-white text-3xl md:hidden ml-auto" onClick={handleMenu}>
                &#9776;
            </div>

            {/* Desktop Menu */}
            <div className="ml-auto hidden md:flex items-center space-x-6">
                <button className="w-17 h-8 text-white font-poppins">
                    <Link href="/signup">Sign up</Link>
                </button>
                <Link href="api/auth/signin">
                    <button className="bg-[#BFAFF2] w-44 h-12 font-poppins rounded-lg">
                        Log in
                    </button>
                </Link>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="flex flex-col items-center mt-4 space-y-4 md:hidden w-full">
                    <button className="w-17 h-8 text-white font-poppins block">
                        <Link href="/signup">Sign up</Link>
                    </button>
                    <Link href="api/auth/signin">
                        <button className="bg-[#BFAFF2] w-44 h-12 font-poppins rounded-lg block">
                            Log in
                        </button>
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
