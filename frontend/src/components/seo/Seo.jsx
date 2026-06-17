import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import seoConfig from './seoConfig';
import MetaTags from './MetaTags';

/**
 * Seo Component
 * Main SEO controller. Injects dynamic <title>, <meta description>, and handles Open Graph.
 * 
 * @param {Object} props
 * @param {string} [props.title] - Override title
 * @param {string} [props.description] - Override description
 * @param {string} [props.keywords] - Override keywords
 * @param {string} [props.author='VehicleSphere']
 * @param {string} [props.robots='index, follow']
 */
const Seo = ({ 
  title, 
  description, 
  keywords, 
  author = 'VehicleSphere', 
  robots = 'index, follow' 
}) => {
  const location = useLocation();
  const path = location.pathname;

  const resolvedTitle = title || seoConfig[path]?.title || 'Welcome';
  const resolvedDesc = description || seoConfig[path]?.description || 'VehicleSphere - Advanced Vehicle Booking Management.';
  const resolvedKeywords = keywords || seoConfig[path]?.keywords || 'vehicle booking, transportation, fleet management';

  const siteName = import.meta.env.VITE_SITE_NAME || 'Vehicle Booking System';
  const fullTitle = `${resolvedTitle} | ${siteName}`;
  const currentUrl = useMemo(() => {
    if (typeof window !== 'undefined') return window.location.href;
    return `https://vehiclesphere.com${path}`;
  }, [path]);

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={resolvedDesc} />
        <meta name="keywords" content={resolvedKeywords} />
        <meta name="author" content={author} />
        <meta name="robots" content={robots} />
        <link rel="canonical" href={currentUrl} />
      </Helmet>

      <MetaTags
        title={fullTitle}
        description={resolvedDesc}
        url={currentUrl}
      />
    </>
  );
};

export default Seo;
