"use client";
import React from "react";
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
const AboutProperty = ({ listing }) => {
  const Map = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
  });
  const { getByValue } = useCountries();
  const coordinates = getByValue(listing.locationValue)?.latlng;
  return (
    <div className="">
      <Map center={coordinates} />
    </div>
  );
};

export default AboutProperty;
