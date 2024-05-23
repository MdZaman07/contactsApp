export const revalidate = 0;
import { getCurrentUser } from "@/actions/getCurrentUser";
import ContactCards from "./components/ContactCards";
import prisma from "@/libs/prismadb";

async function fetchContacts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const contacts = await response.json();
  return contacts;
}

export default async function Home() {
  const fetchedContacts = await fetchContacts();
  const existingContacts = await prisma.contact.findMany();

  if (existingContacts.length === 0) {
    await prisma.contact.createMany({
      data: fetchedContacts,
    });
  }
  const currentUser = await getCurrentUser();

  return (
    <main className="p-8">
      <ContactCards
        contacts={
          existingContacts.length === 0 ? fetchedContacts : existingContacts
        }
        currentUser={currentUser}
      />
    </main>
  );
}
