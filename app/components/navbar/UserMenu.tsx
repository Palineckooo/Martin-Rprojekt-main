"use client";
import React, { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisetModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import useSelltModal from "@/app/hooks/useSellModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const rentModal = useRentModal();
  const registerModal = useRegisterModal();
  const sellModal = useSelltModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-end gap-3 ">
        <div
          onClick={toggleOpen}
          className="py-4 max-md:px-3 md:py-1 gap-7 md:px-2 md:border-[1px] md:border-neutral-200 flex flex-row items-center  md:rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu className="text-white" />
          <p className="text-white hidden md:block">{currentUser?.name}</p>
          <div className="hidden md:block ">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-full  bg-white overflow-hidden right-0 top-16 text-sm ">
          <div className="flex flex-col items-center cursor-pointer mt-1 w-full">
            {currentUser ? (
              <>
                <MenuItem onClick={rentModal.onOpen} label="Rent out" />
                <MenuItem onClick={sellModal.onOpen} label="Sell out" />
                <MenuItem onClick={sellModal.onOpen} label="Sell out" />
                <MenuItem onClick={() => {}} label="My properties" />

                <hr />
                <MenuItem onClick={() => signOut()} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Register" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
