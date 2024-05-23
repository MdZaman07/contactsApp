import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const { id, contactId } = body;
  //remove contact from favourites list
  if (currentUser.favourites.includes(contactId)) {
    const updatedFavourites = currentUser.favourites.filter(
      (favId) => favId !== contactId
    );
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        favourites: updatedFavourites,
      },
    });
    return NextResponse.json(user);
  } else {
    //add contact to favourites list
    const user = await prisma.user.update({
      where: { id: id },
      data: {
        favourites: {
          push: contactId,
        },
      },
    });
    return NextResponse.json(user);
  }
}
