import React from "react";
import ContactCards from "../components/ContactCards";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

const Favourites = async () => {
  const currentUser = await getCurrentUser();
  const favourites = currentUser?.favourites;
  const favouriteContacts = await prisma.contact.findMany({
    where: {
      id: { in: favourites },
    },
  });
  return (
    <main className="p-8">
      <ContactCards contacts={favouriteContacts} currentUser={currentUser} />
    </main>
  );
};

export default Favourites;
