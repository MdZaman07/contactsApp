import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";

import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { signIn, signOut } from "next-auth/react";

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center mt-5 ml-5">
        <div className="relative w-12 h-12 md:w-16 md:h-16 pb-15 md:pb-0 my-10 sm:my-0">
          <Image
            src="/avatar.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
            className="rounded-full bg-red-200"
          />
        </div>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500 text-[25px] md:text-2xl font-semibold ml-2 md:ml-4">
          Pulok
        </h1>
      </div>
      <h1 className="text-3xl font-bold">Contacts</h1>
      <div className="mr-5 mt-5">
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  );
};

export default NavBar;
