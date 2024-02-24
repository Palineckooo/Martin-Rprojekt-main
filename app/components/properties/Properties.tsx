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
import SearchModal from "../Modals/SearchModal";

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

  const paginate = (event: any, value: any) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
  const sale = <p className="text-blue-500">Na predaj</p>;
  return (
    <Container>
      <div className="w-full flex-col items-center justify-center">
        <div className="px-[30px] border-2 border-white  rounded-xl py-6 max-w-[1170px] mx-auto  lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur ">
          <button
            onClick={() => {
              setIsForRent(true);
            }}
            className=" bg-blue-500 hover:bg-blue-600 transition w-full lg:max-w-[162px] h-16 rounded-lg flex justify-center text-white text-lg items-center "
          >
            Prenájom
          </button>

          <button
            onClick={() => {
              searchModal.onOpen;
            }}
            className=" bg-blue-500 hover:bg-blue-600 transition  lg:max-w-full h-16 rounded-lg flex justify-center text-white text-lg items-center "
          >
            Filter
          </button>

          <button
            onClick={() => {
              setIsForRent(false);
            }}
            className=" bg-blue-500 hover:bg-blue-600 transition w-full  lg:max-w-[162px] h-16 rounded-lg flex justify-center text-white text-lg items-center "
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
          {}
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
