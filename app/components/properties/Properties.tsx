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
interface PropertiesProps {
  listings: any;
  currentUser?: SafeUser | null;
  listingsForSale: any;
}
const Properties: React.FC<PropertiesProps> = ({
  listings,
  listingsForSale,
  currentUser,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(8);
  const [isForRent, setIsForRent] = useState(false);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  if (isForRent == true) {
  }
  const currentListing = listings.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const currentListingForSale = listingsForSale.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (event: any, value: any) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
  const sale = <p className="text-blue-500">Sale</p>;
  return (
    <Container>
      <div className="w-full flex items-center justify-center">
        <Typography
          className="flex items-center"
          variant="h4"
          fontWeight="bold"
          sx={{ fontSize: { lg: "44px", xs: "30px" } }}
          mb="10px"
          mt="50px"
        >
          {isForRent == true ? `Properties for rent` : "Properties for sale"}
        </Typography>
      </div>
      <div className="flex items-center justify-center mt-3">
        <button className="pr-10 " onClick={() => setIsForRent(false)}>
          <Image src={sell} width={40} height={40} alt="sell" />
          <p className=" ">Sell</p>
        </button>

        <button onClick={() => setIsForRent(true)}>
          <Image src={rent1} width={40} height={40} alt="rent" />
          Rent
        </button>
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
          {isForRent == false
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
