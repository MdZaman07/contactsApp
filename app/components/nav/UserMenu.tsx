"use client";
import { useCallback, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";
import { FaUserCircle } from "react-icons/fa";

interface UserMenuProps {
  currentUser: SafeUser | null;
}
const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="
        p-2
        border-[1px]
        border-black
        flex
        flex-row
        items-center
        gap-1
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        text-slate-700"
        >
          <FaUserCircle color="black" size={30} />
          <AiFillCaretDown color="black" />
        </div>
        {isOpen && (
          <div
            className="absolute
            rounded-md
            shadow-md
            w-[170px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            flex
            flex-col
            cursor-pointer"
          >
            {currentUser ? (
              <div>
                <Link href="/">
                  <MenuItem onClick={toggleOpen}>All Contacts</MenuItem>
                </Link>
                <Link href="/favourites">
                  <MenuItem onClick={toggleOpen}>Favourites</MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href="/">
                  <MenuItem onClick={toggleOpen}>All Contacts</MenuItem>
                </Link>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
