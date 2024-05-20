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

async function fetchContacts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // posts?userId=1
  const contacts = await response.json();
  // console.log(contacts);

  return contacts;
}

export default async function Home() {
  const contacts = await fetchContacts();
  const currentUser = await getCurrentUser();

  console.log(currentUser);

  return (
    // <main className="p-8">
    //   {/* <h1 className="text-3xl font-bold mb-4 flex justify-center">Contacts</h1> */}
    //   <div className="flex justify-between items-center mb-4">
    //     <h1 className="text-3xl font-bold">Contacts</h1>
    //     <button
    //       onClick={() => signOut()}
    //       className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
    //     >
    //       Sign Out
    //     </button>
    //   </div>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {contacts.map((contact: any) => (
    //       <ContactCard contact={contact} currentUser={currentUser} />
    //     ))}
    //   </div>
    //   {/* <button onClick={() => ("/contacts")}>Navigate</button> */}
    // </main>
    <main className="p-8">
      <ContactCards contacts={contacts} currentUser={currentUser} />
    </main>
  );
}
