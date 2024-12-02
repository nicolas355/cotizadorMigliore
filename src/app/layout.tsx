import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Logo from "@/components/Logo";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Migliore Cotizador",
  description: "Cotizador de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


<section>

<div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
         
        </div>
      </header>





      
      <main className="container mx-auto mt-8 p-4">
      {children}
      </main>
    
    </div>

    


      </section>
      
      </body>
    </html>
  );
}
