import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#2b2b2b] h-auto py-8 px-4 flex flex-col md:px-16 font-poppins">
      <div className="w-full h-px bg-white mt-8 opacity-20" />

      <h4 className="font-poppins text-white mt-8 text-3xl">Pookie Wallet</h4>
      <div className="flex flex-row">
        <div className="mt-4">
          <ul className="space-x-6 flex flex-row mt-14 text-lg">
            <li>
              <Link href={"/#"} className="text-white">
                ©
              </Link>
            </li>
            <li>
              <Link href={"/#"} className="text-white">
              Pookie Wallet 2025
              </Link>
            </li>
            <li>
              <Link href={"/#"} className="text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href={"/#"} className="text-white">
                Cookies policy
              </Link>
            </li>
            <li>
              <Link href={"/#"} className="text-white">
                Terms of use
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-4 ml-auto">
          <h4 className="text-white">Updates right to your inbox</h4>
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 rounded-md w-full sm:w-64 bg-[#333333] h-12 "
            />
            <button className="bg-[#BFAFF2] w-44 h-12 font-poppins rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
