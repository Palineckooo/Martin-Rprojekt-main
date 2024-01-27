import prisma from "@/app/libs/prismadb";
export default async function getListingForSale() {
  try {
    const listingsForSale = await prisma.sell.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listingsForSale;
  } catch (error: any) {
    throw new Error(error);
  }
}
