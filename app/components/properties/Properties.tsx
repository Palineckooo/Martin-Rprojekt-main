"use client";
import React from "react";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import Container from "../Container";
import Image from "next/image";
import rent from "./rent.png";
import rent1 from "./rent1.png";
import sell from "./sell.png";
import { SafeListing } from "@/app/types";
import { SafeUser } from "@/app/types";
import PropertyCardBetter from "./PropertyCardBetter";
import Input from "../inputs/Input";
import TextField from "@mui/material/TextField";
import Search from "./Search";
import useSearchModal from "@/app/hooks/useSearchModal";

interface PropertiesProps {
  listings: any;
  currentUser?: SafeUser | null;
}
const Properties: React.FC<PropertiesProps> = ({
  listings,

  currentUser,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(5);
  const [isForRent, setIsForRent] = useState(true);
  const [isForSale, setIsForSale] = useState(false);
  const [isForRentAndSale, setIsForRentAndSale] = useState(true);
  const searchModal = useSearchModal();

  function filterPropertiesByCategory(listings: any[], category: string) {
    return listings.filter((listing) => listing.category === category);
  }

  const propertiesForSale = filterPropertiesByCategory(listings, "Predaj");
  const propertiesForRent = filterPropertiesByCategory(listings, "Prenájom");

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  if (isForRent == true) {
  }
  const currentListing = propertiesForRent.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const currentListingForSale = propertiesForSale.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const text = isForRent ? (
    <span>
      Najnovšie inzeráty na <span className="text-blue-500">Predaj</span>
    </span>
  ) : (
    <span>
      Najnovšie inzeráty na <span className="text-blue-500">Prenájom</span>
    </span>
  );
  let predaj = <span className="text-blue-500">Predaj</span>;
  const paginate = (event: any, value: any) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
  const sale = <p className="text-blue-500">Na predaj</p>;
  return (
    <Container>
      <div className="mt-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:px-16 sm:shadow-sm dark:bg-transparent">
            <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight  sm:text-4xl">
              <div>{text}</div>
            </p>

            <form action="/search">
              <label
                className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                htmlFor="search-bar"
              >
                <input
                  onClick={searchModal.onOpen}
                  className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                ></input>

                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-blue-500 border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
                >
                  <div className="flex items-center transition-all opacity-1">
                    <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                      Hĺadať
                    </span>
                  </div>
                </button>
              </label>
            </form>
            <div className="flex justify-center gap-16 mt-4">
              <div>
                <button
                  className="before:ease relative h-12  overflow-hidden border border-blue-500 text-blue-500 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 w-28 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32"
                  type="button"
                  onClick={() => setIsForRent(false)}
                >
                  <span className="relative z-10">Predaj</span>
                </button>
              </div>
              <div>
                <button
                  className="before:ease relative h-12  overflow-hidden border border-blue-500 text-blue-500 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 w-28 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32"
                  type="button"
                  onClick={() => setIsForRent(true)}
                >
                  <span className="relative z-10">Prenájom</span>
                </button>
              </div>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle
                cx="512"
                cy="512"
                r="512"
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fill-opacity="0.7"
              ></circle>
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stop-color="#3b82f6"></stop>
                  <stop offset="1" stop-color="#1d4ed8"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div></div>
      <Box id="exercises" sx={{ mt: { lg: "5px" } }} mt="5px" p="5px">
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
          {isForRent == true
            ? currentListing.map((listing: any) => (
                <PropertyCardBetter
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                />
              ))
            : currentListingForSale.map((listing: any) => (
                <PropertyCardBetter
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                />
              ))}
        </div>
        <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
          {propertiesForSale.length > 3 ||
            (propertiesForRent.length > 5 && (
              <Pagination
                color="standard"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(listings.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
              />
            ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Properties;
/*       <Typography
          className="flex items-center"
          variant="h4"
          fontWeight="bold"
          sx={{ fontSize: { lg: "44px", xs: "30px" } }}
          mb="10px"
          mt="50px"
        >
          {isForRent == true
            ? `Nehnutelnosťi na penájom`
            : "hnutelnosťi na predaj"}
        </Typography>
      </div>
      <div className="flex items-center justify-center mt-3">
        <button className="pr-10 " onClick={() => setIsForRent(false)}>
          <Image src={sell} width={40} height={40} alt="sell" />
          <p className=" ">Predaj</p>
        </button>

        <button onClick={() => setIsForRent(true)}>
          <Image src={rent1} width={40} height={40} alt="rent" />
          Prenájom
        </button>*/
