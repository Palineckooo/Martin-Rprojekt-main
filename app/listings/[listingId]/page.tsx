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
import Footer from "@/app/Footer";
import dynamic from "next/dynamic";
import useCountries from "@/app/hooks/useCountries";
import AboutProperty from "./AboutProperty";
interface IParams {
  listingId?: string;
}

const ListingPagCopy = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const Map = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
  });

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
              <h2 className="text-2xl mb-2 font-semibold">{listing.title}</h2>
              <div className="flex gap-1 mb-2 lg:flex-row lg:items-center lg:justify-between">
                <h3 className="text-lg mb-4">{listing.locationValue}</h3>
                <h3 className="text-lg mb-4">{listing.cityName}</h3>
                <h3 className="text-lg mb-4">{listing.adress}</h3>
              </div>
              <div className="mt-[-10px]  lg:mb-0 flex  mb-4  gap-x-2 text-sm">
                <div className="bg-blue-500 mb-2 text-white rounded-full px-3">
                  {listing.category}
                </div>
                <div className="bg-blue-500 mb-2 text-white rounded-full px-3">
                  {listing.category2}
                </div>
              </div>
            </div>

            <div className="text-3xl font-semibold text-blue-500">
              ${listing.price}
            </div>
          </div>
          <div
            className="
          w-full
          h-[70vh]
          overflow-hidden 
          rounded-xl
          relative
        "
          >
            <Image
              src={listing.imageSrc}
              fill
              className="object-cover w-full"
              alt="Image"
            />
            <div
              className="
            absolute
            top-5
            right-5
          "
            ></div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col ml-44 mr-44 gap-8 ">
          <div className="flex flex-col gap-2 ">
            <div
              className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
            >
              <div>Hosted by {currentUser?.name}</div>
            </div>
            <div
              className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
            >
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
            </div>
          </div>
          <hr />
          <div
            className="
      text-lg font-light text-neutral-500"
          >
            {listing.description}
          </div>
          <hr />
          <div className="flex gap-4 ">
            <div className="flex-1 w-1/2 ">
              <div className="flex-1 bg-white w-full mb-8 border shadow-lg border-gray-300 rounded-lg  px-6 py-8 ">
                <div className="flex flex-col items-center  gap-x-4 mb-8">
                  <div className="w-20 p-1 border border-gray-300">
                    <Image src={user} alt="photo" className="" />
                  </div>
                  <div className="font-bold text-lg mt-4">{listing.email}</div>
                </div>
                <EmailForm currentUser={currentUser} listing={listing} />
              </div>
            </div>
            <div className="flex-1 w-1/2 h-40">
              <AboutProperty listing={listing} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </ClientsOnly>
  );
};

export default ListingPagCopy;
//
