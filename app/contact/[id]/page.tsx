import ContactDetails from "@/app/components/ContactDetails";
import { PrimeReactProvider } from "primereact/api";
import React from "react";

interface Params {
  id: string;
}
async function fetchContacts(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?id=${id}`
  );
  // posts?userId=1
  const contacts = await response.json();

  return contacts;
}
const Product = async ({ params }: { params: Params }) => {
  const contacts = await fetchContacts(params.id);
  return (
    <>
      {contacts.map((contact: any) => (
        <ContactDetails key={contact.id} contact={contact} />
      ))}
    </>
  );
};

export default Product;
