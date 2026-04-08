import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "GlowUp — L'excellence beauté",
  description: "Réservez vos soins dans les meilleurs salons de beauté.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  let user = session;

  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#FAFAFA] overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <Navbar initialUser={user} />
        <main>{children}</main>
      </body>
    </html>
  );
}