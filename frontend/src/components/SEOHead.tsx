import React from 'react';
import { Helmet } from 'react-helmet-async';
import { YoastSEO } from '../types/wordpress';

interface SEOHeadProps {
  yoastData?: YoastSEO;
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  yoastData,
  title,
  description,
  canonical,
  ogImage,
  noIndex = false,
}) => {
  const seoTitle = yoastData?.title || title || 'Default Title';
  const seoDescription = yoastData?.description || description || 'Default description';
  const seoCanonical = yoastData?.canonical || canonical || window.location.href;
  const seoOgImage = yoastData?.og_image || ogImage;

  const robotsContent = noIndex 
    ? 'noindex, nofollow' 
    : yoastData?.robots 
      ? `${yoastData.robots.index}, ${yoastData.robots.follow}`
      : 'index, follow';

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={seoCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={yoastData?.og_title || seoTitle} />
      <meta property="og:description" content={yoastData?.og_description || seoDescription} />
      <meta property="og:url" content={yoastData?.og_url || seoCanonical} />
      <meta property="og:type" content={yoastData?.og_type || 'website'} />
      <meta property="og:locale" content={yoastData?.og_locale || 'en_US'} />
      <meta property="og:site_name" content={yoastData?.og_site_name || 'Your Site Name'} />
      
      {seoOgImage && (
        <meta property="og:image" content={seoOgImage} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content={yoastData?.twitter_card || 'summary_large_image'} />
      <meta name="twitter:title" content={yoastData?.og_title || seoTitle} />
      <meta name="twitter:description" content={yoastData?.og_description || seoDescription} />
      
      {seoOgImage && (
        <meta name="twitter:image" content={seoOgImage} />
      )}
      
      {/* JSON-LD Schema */}
      {yoastData?.schema && (
        <script type="application/ld+json">
          {JSON.stringify(yoastData.schema)}
        </script>
      )}
      
      {/* Article meta for posts */}
      {yoastData?.article_modified_time && (
        <meta property="article:modified_time" content={yoastData.article_modified_time} />
      )}
    </Helmet>
  );
};