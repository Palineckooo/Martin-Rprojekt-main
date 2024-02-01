import getCurrentUser from "@/app/actions/getCurentUser";
import getListingById from "@/app/actions/getListingById";

import ClientsOnly from "@/app/components/ClientsOnly";
import EmptyState from "@/app/components/EmptyState";
import { FaBed } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import Image from "next/image";
import ListingClient from "./ListingClient";
import Navbar1 from "@/app/components/navbar/Navbar1";
import user from "./user.png";
import Link from "next/link";
import { SafeUser } from "@/app/types";
import Button from "@/app/components/Button";
import EmailForm from "./EmailForm";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientsOnly>
        <EmptyState />
      </ClientsOnly>
    );
  }
  const handleClick = () => {
    console.log("stlacenie");
  };
  return (
    <ClientsOnly>
      <Navbar1 currentUser={currentUser} />
      <section className="pt-6">
        <div className="container mx-auto min-h-[800px] mb-14">
          <div className="flex justify-start flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="">
              <h2 className="text-2xl font-semibold">{listing.title}</h2>
              <div className="flex gap-1 lg:flex-row lg:items-center lg:justify-between">
                <h3 className="text-lg mb-4">{listing.locationValue}</h3>
                <h3 className="text-lg mb-4">{listing.cityName}</h3>
                <h3 className="text-lg mb-4">{listing.adress}</h3>
              </div>
              <div className="mt-[-10px]  lg:mb-0 flex   gap-x-2 text-sm">
                <div className="bg-blue-500  text-white rounded-full px-3">
                  {listing.category}
                </div>
                <div className="bg-blue-500 text-white rounded-full px-3">
                  {listing.category2}
                </div>
              </div>
            </div>

            <div className="text-3xl font-semibold text-blue-500">
              ${listing.price}
            </div>
          </div>
          <div className="flex flex-col items-start gap-7 lg:flex-row">
            <div className="max-w-[768px]">
              <div className="mb-8">
                <Image
                  src={listing.imageSrc}
                  alt="house"
                  height={512}
                  width={1000}
                  className="rounded-lg mt-3"
                />
              </div>
              <div className="flex gap-x-6  mb-6 ">
                <div className="flex gap-x-2 items-center justify-center">
                  <FaBed className="text-blue-500 " size={30} />
                  <div>{listing.bedroomCount}</div>
                </div>
                <div className="flex gap-x-2 items-center justify-center">
                  <FaShower className="text-blue-500 " size={20} />
                  <div>{listing.bathroomCount}</div>
                </div>
                <div className="flex gap-x-2 items-center justify-center">
                  <IoIosResize className="text-blue-500 " size={20} />
                  <div>
                    {listing.size}m<sup>2</sup>
                  </div>
                </div>
              </div>

              <div>{listing.description}</div>
            </div>
            <div className="flex-1 bg-white w-full mb-8 border border-gray-300 rounded-lg mt-3 px-6 py-8 ">
              <div className="flex flex-col items-center gap-x-4 mb-8">
                <div className="w-20 h-20 p-1 border border-gray-300">
                  <Image src={user} alt="photo" className="" />
                </div>
                <div className="font-bold text-lg mt-4">{listing.email}</div>
              </div>
              <EmailForm currentUser={currentUser} listing={listing} />
            </div>
          </div>
        </div>
      </section>
    </ClientsOnly>
  );
};

export default ListingPage;
//
