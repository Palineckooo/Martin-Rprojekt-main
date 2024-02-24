import EmptyState from "@/app/components/EmptyState";
import ClientsOnly from "../components/ClientsOnly";

import getCurrentUser from "../actions/getCurentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import FavoritesClient from "./FavoritesClient";
import Navbar from "../components/navbar/Navbar";
import Footer from "../Footer";
const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientsOnly>
        <Navbar currentUser={currentUser} />
        <EmptyState title="Nemate ziadne oblubene inzeraty" subtitle="" />
        <Footer />
      </ClientsOnly>
    );
  }

  return (
    <ClientsOnly>
      <Navbar currentUser={currentUser} />
      <FavoritesClient listings={listings} currentUser={currentUser} />
      <Footer />
    </ClientsOnly>
  );
};

export default ListingPage;
