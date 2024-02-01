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

interface PropertiesProps {
  listings: any;
  currentUser?: SafeUser | null;
}
const Properties: React.FC<PropertiesProps> = ({
  listings,

  currentUser,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(8);
  const [isForRent, setIsForRent] = useState(true);
  const [isForSale, setIsForSale] = useState(false);
  const [isForRentAndSale, setIsForRentAndSale] = useState(true);

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

  const paginate = (event: any, value: any) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
  const sale = <p className="text-blue-500">Na predaj</p>;
  return (
    <Container>
      <div className="w-full flex items-center justify-center">
        <div className="px-[30px] border-2 border-white  rounded-xl py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between  w-full lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur ">
          <button
            onClick={() => {
              setIsForRent(true);
            }}
            className=" bg-blue-500 hover:bg-blue-600 transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center text-white text-lg items-center "
          >
            Prenajom
          </button>
          <form className="w-full">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Mesto
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              ></input>
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Hľadať
              </button>
            </div>
          </form>
          <button
            onClick={() => {
              setIsForRent(false);
            }}
            className=" bg-blue-500 hover:bg-blue-600 transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center text-white text-lg items-center "
          >
            Predaj
          </button>
        </div>
      </div>
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
          {listings.length > 3 && (
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(listings.length / exercisesPerPage)}
              page={currentPage}
              onChange={paginate}
              size="large"
            />
          )}
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
