import Image from "next/image";
import ContactCard from "./components/ContactCard";
import { useRouter } from "next/navigation";
import Contacts from "./contacts/page";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getContactById from "@/actions/getContactById";

import FormWrap from "./components/FormWrap";
import RegisterForm from "./register/RegisterForm";
import Container from "./components/Container";
import { signOut } from "next-auth/react";
import ContactCards from "./components/ContactCards";
import axios from "axios";
import prisma from "@/libs/prismadb";

async function fetchContacts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const contacts = await response.json();

  return contacts;
}

export default async function Home() {
  const contacts = await fetchContacts();
  const existingContacts = await prisma.contact.findMany();
  const isContactTableEmpty = existingContacts.length === 0;
  if (isContactTableEmpty) {
    const insertedContacts = await prisma.contact.createMany({
      data: contacts,
    });
  }
  const currentUser = await getCurrentUser();

  console.log(currentUser);

  return (
    <main className="p-8">
      <ContactCards contacts={contacts} currentUser={currentUser} />
    </main>
  );
}
