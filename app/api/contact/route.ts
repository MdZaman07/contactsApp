import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const { id, name, username, email, address, phone, website, company } = body;

  const contact = await prisma.contact.create({
    data: {
      id,
      name,
      username,
      email,
      address,
      phone,
      website,
      company,
    },
  });
  return NextResponse.json(contact);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, image } = body;
  // console.log(body);
  const updatedContact = await prisma.contact.update({
    where: { id: id },
    data: {
      image: image,
    },
  });
  return NextResponse.json(updatedContact);
}
