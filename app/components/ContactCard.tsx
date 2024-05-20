"use client";
import Link from "next/link";
import Avatar from "./Avatar";
import { Contact, SafeUser } from "@/types";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";
import axios from "axios";
import toast from "react-hot-toast";
import getContactById from "@/actions/getContactById";
import { useEffect, useState } from "react";

type ContactCardProps = {
  contact: Contact;
  currentUser: SafeUser | null;
};

const ContactCard = ({ contact, currentUser }: ContactCardProps) => {
  const router = useRouter();
  const [contactExists, setContactExists] = useState<boolean>(false);

  // useEffect(() => {
  //   const checkExistence = async () => {
  //     const contactEx = await getContactById({ contactId: contact.id });
  //     if (contactEx) {
  //       setContactExists(true);
  //     }
  //   };
  //   if (currentUser) {
  //     checkExistence();
  //   }
  // }, []);

  const handleFavorites = async () => {
    if (!contactExists) {
      axios
        .post("/api/contact", contact)
        .then((res) => {
          toast.success("Added to DB");
        })
        .catch((err) => {
          toast.error("Oops! Couldn't be added to DB!");
          console.log(err);
        });
    }
    axios
      .put("/api/user", {
        id: currentUser?.id,
        contactId: contact.id,
      })
      .then((res) => {
        toast.success("Added to Favourites");
        router.refresh();
        console.log("successsss");
      })
      .catch((err) => {
        toast.error("Oops! Couldn't be added!");
        console.log(err);
      });
  };
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow bg-gradient-to-r from-red-100 to-gray-300 bg-cover bg-center text-black ">
      <div className="flex items-center mb-2">
        <Avatar src="/avatar1.jpg" />
        <h2 className="text-xl font-bold ml-4">{contact.name}</h2>
      </div>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <Link href={`/contact/${contact.id}`}>
        <span className="text-blue-500 mt-2 inline-block cursor-pointer">
          View Details
        </span>
      </Link>
      {currentUser ? (
        contactExists ? (
          <Button
            label="Already Added"
            onClick={() => {
              handleFavorites();
            }}
          />
        ) : (
          <Button
            label="Add to Favorites"
            onClick={() => {
              handleFavorites();
            }}
          />
        )
      ) : (
        <Button
          label="Login"
          onClick={() => {
            router.push("/login");
          }}
        />
      )}
    </div>
  );
};

export default ContactCard;
