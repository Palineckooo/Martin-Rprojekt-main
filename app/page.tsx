import Container from "@/app/components/Container";

import EmptyState from "@/app/components/EmptyState";

import getListings from "./actions/getListings";
import getListingForSale from "./actions/getListingForSale";
import getCurrentUser from "./actions/getCurentUser";
import ClientsOnly from "./components/ClientsOnly";
import Properties from "./components/properties/Properties";

const Home = async () => {
  const listings = await getListings();
  const listingsForSale = await getListingForSale();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientsOnly>
        <EmptyState showReset />
      </ClientsOnly>
    );
  }

  return (
    <ClientsOnly>
      {" "}
      <Properties
        currentUser={currentUser}
        listingsForSale={listingsForSale}
        listings={listings}
      />
      {/*}  <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
         {{listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
          {listingsForSale.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
          </Container>{*/}
    </ClientsOnly>
  );
};

export default Home;
