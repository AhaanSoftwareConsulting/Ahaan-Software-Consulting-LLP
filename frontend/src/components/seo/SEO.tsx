import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
}) => {
  const siteUrl = "https://ahaan-software-consulting-llp.vercel.app";

  const fullUrl = `${siteUrl}${path}`;

  const pageTitle = `${title} | Ahaan Software Consulting`;

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <Helmet prioritizeSeoTags>
      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={fullUrl}
      />
    </Helmet>
  );
};