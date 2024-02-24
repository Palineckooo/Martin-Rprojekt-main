"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";
import PropertyCardBetterDeleteTotal from "../components/properties/PropertyCardBetterDeketeTotal";
import Heading from "../components/Modals/Heading";
import Container from "@/app/components/Container";
import PropertyCardBetter from "../components/properties/PropertyCardBetter";
import Navbar1 from "../components/navbar/Navbar1";
import PropertyCardBetterDelete from "../components/properties/PropertyCardBetterDelete";
import Heading2 from "../Heading2";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Inzerat vymazany");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("Splnene");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading2 />
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
          <PropertyCardBetterDeleteTotal
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Vymazanie inzerátu"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
