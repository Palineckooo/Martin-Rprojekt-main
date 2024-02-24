"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation, Listing } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { FaBath } from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { FaBed } from "react-icons/fa";
import HeartButton from "../HeartButton";
import HeartButtonDelete from "@/app/HearthButtonDelete";

//import HeartButton from "../HeartButton";
import Button from "../Button";
interface PropertyCardBetterProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const PropertyCardBetterDelete: React.FC<PropertyCardBetterProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);
  return (
    <div
      className="relative mx-auto w-full"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
      />{" "}
      <a
        href="#"
        className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
      >
        <div className="rounded-lg bg-white p-4 shadow-xl">
          <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
            <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
              <div className="absolute inset-0 bg-black bg-opacity-80">
                <Image
                  alt="listing"
                  src={data.imageSrc}
                  className="object-cover h-full w-full  group-hover:scale-110 transition"
                  fill
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-5 mb-3 flex">
              <p className="flex items-center font-medium text-white shadow-sm">
                <i className="fa fa-camera mr-2 text-xl text-white"></i>
              </p>
            </div>
            <div className="absolute bottom-0 right-5 mb-3 flex">
              <p className="flex items-center font-medium text-gray-800">
                <i className="fa fa-heart mr-2 text-2xl text-white"></i>
              </p>
            </div>

            <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
              {" "}
              {data.category}{" "}
            </span>
            <span className="absolute top-0 left-0 z-10 mt-3 ml-3 inline-flex select-none rounded-lg bg-transparent px-3 py-2 text-lg font-medium text-white">
              {" "}
              <i className="fa fa-star"></i>{" "}
            </span>
          </div>

          <div className="mt-4">
            <h2
              className="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg"
              title="New York"
            >
              {data.title}
            </h2>

            <p className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
              <span className="text-sm uppercase"> EUR </span>

              {data.category == "Prenájom" ? (
                <span className=" "> {data.price} / mesiac</span>
              ) : (
                <span className="text-2xl">{data.price}€ </span>
              )}
            </p>
          </div>
          <div className="mt-4">
            <p className="line-clamp-1 mt-2 text-lg text-gray-800"></p>
          </div>
          <div className="justify-center">
            <div className="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
              <p className="flex items-center font-medium text-gray-800">
                <FaBed className="mr-2 text-blue-900" />
                {data.roomCount}
              </p>

              <p className="flex items-center font-medium text-gray-800">
                <FaBath className="mr-2 text-blue-900" />
                {data.bathroomCount}
              </p>
              <p className="flex items-center font-medium text-gray-800">
                <IoIosResize className="mr-2 text-blue-900" />
                {data.size} m<sup>2</sup>
              </p>
            </div>
          </div>
          <div className="mt-8 mb-3 ">
            <div className="flex items-center w-full">
              <div className="relative">
                <div className="h-6 w-6 rounded-full bg-gray-200 md:h-8 md:w-8 flex items-center justify-center align-middle">
                  <CiUser />
                </div>
                <span className="bg-primary-red absolute top-0 right-0 inline-block h-3 w-3 rounded-full"></span>
              </div>

              <p className="line-clamp-1 ml-2 w-full text-gray-800">
                {" "}
                {data.email}
              </p>
            </div>
          </div>

          <HeartButtonDelete listingId={data.id} currentUser={currentUser} />
        </div>
      </a>
    </div>
  );
};

export default PropertyCardBetterDelete;
