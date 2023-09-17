import React from "react";
import Head from "next/head";
import Siderbar from "./Siderbar";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Crm admin</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="min-h-screen">
        <div className="flex min-h-screen">
          <Siderbar />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
