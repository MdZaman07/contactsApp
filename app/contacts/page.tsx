import React from "react";
import ContactCard from "../components/ContactCard";

async function fetchContacts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // posts?userId=1
  const contacts = await response.json();
  console.log(contacts);

  return contacts;
}
const Contacts = async () => {
  const contacts = await fetchContacts();
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact: any) => (
          <ContactCard
            key={contact.id}
            id={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
          />
        ))}
      </div>
    </main>
  );
};

export default Contacts;
