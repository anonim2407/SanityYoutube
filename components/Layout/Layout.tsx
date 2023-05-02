import React from "react";
import Header from "../Header";
import Head from "next/head";

export default function Layout({ children, title, description }: any) {
  return (
    <>
      <Head>
        <title>{`${title}; - BuscaTuAI  `}</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />
      <main className="bg-[#001322]">{children}</main>
    </>
  );
}
