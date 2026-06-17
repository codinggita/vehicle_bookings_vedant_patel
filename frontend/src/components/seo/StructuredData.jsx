import { Helmet } from 'react-helmet-async';

/**
 * StructuredData Component
 * Injects JSON-LD schema into the <head> for rich SEO snippets.
 */
const StructuredData = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VehicleSphere",
    "url": "https://vehiclesphere.com",
    "logo": "https://vehiclesphere.com/logo.png",
    "sameAs": [
      "https://twitter.com/vehiclesphere",
      "https://linkedin.com/company/vehiclesphere"
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "VehicleSphere Dashboard",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webAppSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
