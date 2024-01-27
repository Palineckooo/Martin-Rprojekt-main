"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation, Listing } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
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

const PropertyCardBetter: React.FC<PropertyCardBetterProps> = ({
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
    <div className="relative mx-auto w-full">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
        crossorigin="anonymous"
      />{" "}
      <a
        href="#"
        className="relative inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
      >
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
            <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
              <div className="absolute inset-0 bg-black bg-opacity-80">
                <Image
                  alt="listing"
                  src={data.imageSrc}
                  className="object-cover h-full w-full group-hover:scale-110 transition"
                  fill
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-5 mb-3 flex">
              <p className="flex items-center font-medium text-white shadow-sm">
                <i className="fa fa-camera mr-2 text-xl text-white"></i>
                10
              </p>
            </div>
            <div className="absolute bottom-0 right-5 mb-3 flex">
              <p className="flex items-center font-medium text-gray-800">
                <i className="fa fa-heart mr-2 text-2xl text-white"></i>
              </p>
            </div>

            <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
              {" "}
              Residential{" "}
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
              {data.description}
            </h2>

            <p className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
              <span className="text-sm uppercase"> EUR </span>
              <span className="text-2xl">{data.price}</span>
            </p>
          </div>
          <div className="mt-4">
            <p className="line-clamp-1 mt-2 text-lg text-gray-800"></p>
          </div>
          <div className="justify-center">
            <div className="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
              <p className="flex items-center font-medium text-gray-800">
                <i className="fa fa-bed mr-2 text-blue-900"></i>
                {data.roomCount}
              </p>

              <p className="flex items-center font-medium text-gray-800">
                <i className="fa fa-bath mr-2 text-blue-900"></i>
                {data.bathroomCount}
              </p>
              <p className="flex items-center font-medium text-gray-800">
                <i
                  className="fa fa-home mr-2 text-blue-900"
                  aria-hidden="true"
                ></i>
                2000 Sqft<sup>2</sup>
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2">
            <div className="flex items-center">
              <div className="relative">
                <div className="h-6 w-6 rounded-full bg-gray-200 md:h-8 md:w-8"></div>
                <span className="bg-primary-red absolute top-0 right-0 inline-block h-3 w-3 rounded-full"></span>
              </div>

              <p className="line-clamp-1 ml-2 text-gray-800">{}</p>
            </div>

            <div className="flex justify-end">
              <button>
                <i className="fa fa-sms mx-1 rounded-md bg-[#0174E1] py-1 px-3 text-2xl text-white"></i>
              </button>
              <button>
                <i className="fa fa-phone rounded-md bg-[#0174E1] py-1 px-3 text-2xl text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PropertyCardBetter;
