"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import rent from "./rent.jpg";
import { FaHouseChimney } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";

import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "@/app/CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Prenájom",
    icon: FaBed,
    description: "Chete prenajať svoju nehnutelnosť",
  },
  {
    label: "Predaj",
    icon: FaBed,
    description: "Chete predať svoju nehnutelnosť",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
