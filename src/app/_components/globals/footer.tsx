import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] py-10 px-6 md:px-16 font-poppins flex flex-col items-center">
      {/* Divider */}
      <div className="w-full h-px bg-white opacity-20 mb-8" />

      {/* Title */}
      <h4 className="text-white text-2xl md:text-3xl mb-6 justiy-start">Pookie Wallet</h4>

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-4">

        {/* Left Section - Links */}
        <div className="flex-1">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base md:text-lg text-white opacity-80">
            <li>
              <Link href="/#" className="hover:opacity-100">©</Link>
            </li>
            <li>
              <Link href="/#" className="hover:opacity-100">Pookie Wallet 2025</Link>
            </li>
            <li>
              <Link href="/#" className="hover:opacity-100">Privacy policy</Link>
            </li>
            <li>
              <Link href="/#" className="hover:opacity-100">Cookies policy</Link>
            </li>
            <li>
              <Link href="/#" className="hover:opacity-100">Terms of use</Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Newsletter */}
        <div className="flex-1 md:ml-auto">
          <h4 className="text-white text-lg mb-3">
            Updates right to your inbox
          </h4>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 rounded-md w-full sm:w-72 bg-[#333333] h-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BFAFF2]"
            />
            <button className="bg-[#BFAFF2] text-black w-full sm:w-40 h-12 font-poppins rounded-lg hover:opacity-90 transition">
              Send
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
