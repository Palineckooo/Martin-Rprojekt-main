import getCurrentUser from "@/app/actions/getCurentUser";
import getListingById from "@/app/actions/getListingById";

import ClientsOnly from "@/app/components/ClientsOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);

  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientsOnly>
        <EmptyState />
      </ClientsOnly>
    );
  }

  return (
    <ClientsOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientsOnly>
  );
};

export default ListingPage;
