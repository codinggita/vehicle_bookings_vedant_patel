import seoConfig from './seoConfig.js';

/**
 * Utility script to dynamically generate sitemap.xml for Node/SSR environments.
 * For this Vite React SPA, we'll run this manually or keep it as reference.
 */
export const generateSitemap = (domain = 'https://vehiclesphere.com') => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const routes = Object.keys(seoConfig);

  routes.forEach((route) => {
    xml += '  <url>\n';
    xml += `    <loc>${domain}${route}</loc>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
};
