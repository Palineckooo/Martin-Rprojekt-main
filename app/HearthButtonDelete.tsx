"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useDeleteFavorite from "./hooks/useDeleteFavorite";
import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import ClientsOnly from "./components/ClientsOnly";

import Button from "./components/Button";
interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButtonDelete: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { toggleDeleteFavorite } = useDeleteFavorite({
    listingId,
    currentUser,
  });

  return (
    <div>
      <Button
        small
        label="Odstrániť z obľúbených"
        onClick={toggleDeleteFavorite}
      />
    </div>
  );
};

export default HeartButtonDelete;
