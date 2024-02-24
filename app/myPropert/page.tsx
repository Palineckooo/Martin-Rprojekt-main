import EmptyState from "@/app/components/EmptyState";
import ClientsOnly from "../components/ClientsOnly";

import getCurrentUser from "../actions/getCurentUser";
import getListings from "@/app/actions/getListings";
import Navbar from "../components/navbar/Navbar";
import PropertiesClient from "./PropertiesClient";
import Footer from "../Footer";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title="Prístup nepovoleý" subtitle="Prosím prihláste sa" />
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientsOnly>
        <Navbar currentUser={currentUser} />
        <EmptyState title="Nemáte žiadne inzeráty" subtitle="" />
        <Footer />
      </ClientsOnly>
    );
  }

  return (
    <ClientsOnly>
      <Navbar currentUser={currentUser} />
      <div className="mt-6"></div>
      <PropertiesClient listings={listings} currentUser={currentUser} />
      <Footer />
    </ClientsOnly>
  );
};

export default PropertiesPage;
