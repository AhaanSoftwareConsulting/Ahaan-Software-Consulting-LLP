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
    // Update existing title
    document.title = pageTitle;

    // Update existing meta description
    let metaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [pageTitle, description]);

  return (
    <Helmet prioritizeSeoTags>
      {/* Canonical URL */}
      <link
        rel="canonical"
        href={fullUrl}
      />
    </Helmet>
  );
};