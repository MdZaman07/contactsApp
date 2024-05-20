import React from "react";
import ContactCard from "../components/ContactCard";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Button from "../components/Button";
import { signOut } from "next-auth/react";
import ContactCards from "./ContactCards";

async function fetchContacts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const contacts = await response.json();

  return contacts;
}
const Contacts = async () => {
  const contacts = await fetchContacts();
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <main className="p-8">
      <ContactCards contacts={contacts} currentUser={currentUser} />
    </main>
  );
};

export default Contacts;
