import UserMenu from "./UserMenu";
import { SafeUser } from "@/types";
import Image from "next/image";

const NavBar = ({ currentUser }: { currentUser: SafeUser | null }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <div className="relative flex items-center">
        <div className="relative w-12 h-12 md:w-16 md:h-16 pb-15 md:pb-0  md:ml-5 mt-5 md:mt-5">
          <Image
            src="/profPic.jpg"
            alt="logo"
            layout="fill"
            objectFit="contain"
            className="rounded-full bg-black  "
          />
        </div>
        <h1 className="ml-2 flex items-center justify-center h-full font-bold mt-5">
          {currentUser ? currentUser.name : "GUEST"}
        </h1>
      </div>

      <div className="flex items-center justify-center md:mt-0">
        <div className="relative w-32 h-12 md:w-40 md:h-16 mt-5 md-0 md:mr-20">
          <Image
            src="/FullLogo.jpg"
            alt="Full Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="md:mr-5 mt-5">
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  );
};

export default NavBar;
