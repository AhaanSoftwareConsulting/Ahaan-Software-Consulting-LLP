import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, path }) => {
  const siteUrl = "https://ahaan-software-consulting-llp.vercel.app";
  const fullUrl = `${siteUrl}${path}`;

  // টাইটেল স্ট্রিং আগেই ফরম্যাট করে নিন
  const pageTitle = `${title} | Ahaan Software Consulting`;

  return (
    <Helmet prioritizeSeoTags>
      {/* Dynamic Title */}
      <title>{pageTitle}</title>

      {/* Meta Description */}
      <meta name="description" content={description} />

      {/* Canonical Link */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};