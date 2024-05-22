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
      <ContactCards contacts={existingContacts} currentUser={currentUser} />
    </main>
  );
}
