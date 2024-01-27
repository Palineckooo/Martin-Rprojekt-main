import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientsOnly from "./components/ClientsOnly";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import RentModal from "./components/Modals/RentModal";
import SellModal from "./components/Modals/SellModal";
import Navbar from "./components/navbar/Navbar";
import getCurrentUser from "./actions/getCurentUser";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Realitik",
  description: "Najnovsia realitna kancelaria",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <ClientsOnly>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <SellModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
      </ClientsOnly>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
