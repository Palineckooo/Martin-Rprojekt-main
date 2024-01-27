"use client";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [clicked, setIsClicked] = useState(false);
  const [input, setInput] = useState("");
  const [form, setForm] = useState({ location: "" });
  const [empthy, setIsEmpty] = useState(false);
  const router = useRouter();

  return (
    <div className="h-screen custom-img ">
      <nav className="font-normal">
        <div className="max-w-6xl  mx-auto ">
          <div className="flex justify-between md:justify-between md:items-center">
            <div className="flex gap-3 items-center">
              {/*                                        Left Logo                                                                         */}
              <div>
                <a href="#" className="flex items-end py-3 px-3">
                  <span className=" text-3xl font-normal text-white ">
                    <button onClick={router.back}>REALITIK</button>
                  </span>
                </a>
              </div>
              {/*                                   End of Left Logo*                                                                     /}
            {/*                                    Rigt List Items                                                                   */}
            </div>
            <UserMenu currentUser={currentUser} />

            {/*                                                                 End of Rigt List Items                                                                                         */}
            {/*                                                                     Burger                                                                                                         */}

            {/*                                                                    End of  Burger                                                                                                         */}
          </div>
          {/*                                                                     Mobile version                                                                                                         */}
          <div
            className={
              clicked
                ? "md:hidden flex items-center justify-center w-screen transition ease-in-out delay-150  "
                : "hidden"
            }
          >
            {" "}
            <ul className="  ">
              <li className="  ">
                <a
                  href="#"
                  className="hover:text-blue-500 w-full flex items-center align-middle gap-1 pt-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-white  "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <span className="text-white "> Home</span>
                </a>
              </li>
              <hr className="my-1 h-0.5 border-t-0 bg-neutral-100  opacity-50" />
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 flex items-center pt-3 gap-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300  "
                >
                  <button
                    className=""
                    onClick={() => {
                      setIsClicked(!clicked);
                      console.log(clicked);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </button>

                  <span className="text-white"> Contact </span>
                </a>
              </li>
              <hr className="my-1 h-0.5 border-t-0 bg-neutral-100  opacity-50" />
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 flex items-center pt-3  gap-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <span className="text-white">About</span>
                </a>
              </li>
              <hr className="my-1 h-0.5 border-t-0 bg-neutral-100  opacity-50" />
            </ul>
          </div>
        </div>
      </nav>
      <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 mt-6">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Nájdi svôj vysnívaný domov
          </h1>
          <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 ">
            Vítajte v našej realitnej kancelárii, kde kúpou a prenájmom
            nehnuteľností vytvárame príbehy. S oddanosťou a profesionalitou
            nájdeme váš ideálny domov alebo investičný objekt.Nechajte nás byť
            súčasťou vašej cesty za novým domovom, kde sa váš sen stáva
            skutočnosťou.
          </p>
          <div className="flex justify-center py-3 px-6 w-full">
            <form className="">
              <div className="relative flex items-center"></div>
              <p>{` ${form.location}`}</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
/* <div className="fixed w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0  ">
           
          </div>
        </Container>
      </div>
    </div> */
