"use client";
import React, { useEffect, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ContactCard from "../components/ContactCard";
import Button from "../components/Button";
import { signIn, signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { SafeUser } from "@/types";
import Image from "next/image";
interface ContactCardsProps {
  currentUser: SafeUser | null;
  contacts: any;
}

const ContactCards = ({ contacts, currentUser }: ContactCardsProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("allContacts");
  useEffect(() => {
    if (selectedOption == "favourites") {
      const favourites = currentUser?.favourites;
    }
  }, [selectedOption]);
  return (
    <>
      {/* <h1 className="text-3xl font-bold mb-4 flex justify-center">Contacts</h1>
      {currentUser && <Button label={"Sign Out"} onClick={() => signOut()} />} */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
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
        {currentUser ? (
          <button
            onClick={() => signOut()}
            title="Sign Out"
            data-tooltip-id="my-tooltip-1"

            // className="bg-sky-500 text-black rounded-full p-2 hover:bg-red-600 transition-colors"
          >
            <Image
              src="/left.png"
              alt="Sign Out"
              width={40}
              height={40}
              className="rounded-full hover:bg-gray-600"
            />
            <ReactTooltip id="my-tooltip-1" place="left" content="Signout" />
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-sky-500 text-black rounded-full p-2 hover:bg-red-600 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
      <div className="flex justify-center flex-wrap gap-3 mb-4">
        <div className="flex items-center">
          <RadioButton
            inputId="allContacts"
            name="contactOption"
            value="allContacts"
            onChange={(e) => setSelectedOption(e.value)}
            checked={selectedOption === "allContacts"}
          />
          <label htmlFor="allContacts" className="ml-2">
            All Contacts
          </label>
        </div>
        <div className="flex items-center">
          <RadioButton
            inputId="favorites"
            name="contactOption"
            value="favorites"
            onChange={(e) => setSelectedOption(e.value)}
            checked={selectedOption === "favorites"}
          />
          <label htmlFor="favorites" className="ml-2">
            Favorites
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact: any) => (
          <ContactCard contact={contact} currentUser={currentUser} />
        ))}
      </div>
    </>
  );
};

export default ContactCards;
