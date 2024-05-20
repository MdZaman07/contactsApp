import prisma from "@/libs/prismadb";
import { error } from "console";

interface IParams {
  contactId?: number;
}

export default async function getContactById({
  contactId,
}: {
  contactId: number;
}) {
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId,
      },
    });

    if (!contact) {
      return null;
    }
    return contact;
  } catch (error: any) {
    throw new Error(error);
  }
}
