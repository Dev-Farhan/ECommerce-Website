import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

export default function Layout({
  children,
  title,
  description,
  keywords,
  author,
}) {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "Ecommerce App",
  description: "Mern Stact Project",
  keywords: "mern,react,node,mongodb,chalo kharido,ecommerce app",
  author: "Dev Farhan",
};
