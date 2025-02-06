'use client';

import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-[#2b2b2b] w-full h-24 flex border-b border-black">
            <span className="h-fit mt-auto mb-auto pl-12">
                <h3 className="font-poppins text-white text-3xl">Wallet</h3>
            </span>

            <div className="text-white text-2xl md:hidden ml-auto mt-auto mb-auto mr-12" onClick={handleMenu}>
                &#9776; 
            </div>

            <div className="ml-auto mt-auto mb-auto mr-12 hidden md:flex items-center">
                <button className="w-17 h-8 mr-7 text-white font-poppins">Sign up</button>
                <button className="bg-[#BFAFF2] w-44 h-12 font-poppins rounded-lg">
                    Log in
                </button>
            </div>

            {menuOpen && (
                <div className="flex flex-col items-end mt-4 space-y-2 md:hidden w-full ml-auto">
                    <button className="w-17 h-8 mr-7 text-white font-poppins block">
                        Sign up
                    </button>
                    <button className="bg-[#BFAFF2] w-44 h-12 font-poppins rounded-lg block">
                        Log in
                    </button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
