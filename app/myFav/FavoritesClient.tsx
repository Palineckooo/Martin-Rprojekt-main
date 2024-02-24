import { SafeListing, SafeUser } from "@/app/types";

import Heading from "../components/Modals/Heading";
import Container from "@/app/components/Container";
import PropertyCardBetter from "../components/properties/PropertyCardBetter";
import PropertyCardBetterDelete from "../components/properties/PropertyCardBetterDelete";
import Heading1 from "../Heading1";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <div className="mt-10"></div>
      <Heading1 />
      <div
        className="
      pt-40
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-4
            gap-3
        "
      >
        {listings.map((listing: any) => (
          <PropertyCardBetterDelete
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
