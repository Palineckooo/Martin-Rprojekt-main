import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    adress,
    email,
    bedroomCount,
    size,
    cityName,
    category2,
    phoneNumber,
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      adress,
      email,
      bedroomCount,
      size,
      cityName,
      phoneNumber,
      category2,
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
