import ContactDetails from "@/app/components/ContactDetails";
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
  console.log(contacts);

  return contacts;
}
const Product = async ({ params }: { params: Params }) => {
  const contacts = await fetchContacts(params.id);
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact: any) => (
          <ContactDetails
            key={contact.id}
            id={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            website={contact.website}
            address={contact.address}
          />
        ))}
      </div>
    </main>
  );
};

export default Product;
