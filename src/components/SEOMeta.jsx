import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'CRM Daily';
const DEFAULT_IMAGE = 'https://www.crmdaily.co/og-image.png';
const DEFAULT_DESC = 'Daily CRM news, GTM strategy, tool reviews and RevOps intelligence for revenue professionals.';

export default function SEOMeta({ title, description, image, url, type = 'website' }) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Daily CRM & GTM Intelligence`;
  const fullDesc = description || DEFAULT_DESC;
  const fullImage = image || DEFAULT_IMAGE;
  const fullUrl = url || 'https://www.crmdaily.co';

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}