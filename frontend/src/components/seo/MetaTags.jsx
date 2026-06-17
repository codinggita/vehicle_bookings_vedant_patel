import { Helmet } from 'react-helmet-async';

/**
 * MetaTags Component
 * Renders Open Graph and Twitter meta tags for social media link sharing.
 * 
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.url
 * @param {string} props.image
 */
const MetaTags = ({ title, description, url, image = '/og-image.jpg' }) => {
  return (
    <Helmet>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default MetaTags;
