import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useDeleteFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const toggleDeleteFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        request = () => axios.delete(`/api/favorites/${listingId}`);
        window.scrollTo(0, 100);
        await request();
        router.refresh();
        toast.success("Vymazanie prebehlo uspesne");
      } catch (error) {
        toast.error("Niekde nastala chyba");
      }
    },
    [currentUser, , listingId, loginModal, router]
  );

  return {
    toggleDeleteFavorite,
  };
};

export default useDeleteFavorite;
