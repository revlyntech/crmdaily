import "./globals.css";
import Script from "next/script";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Ticker from "../components/Ticker";
import StockTicker from "../components/StockTicker";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const metadata = {
  title: { default: 'CRM Daily - Your Daily CRM and GTM Intelligence', template: '%s | CRM Daily' },
  description: 'CRM Daily is a free daily publication covering CRM, GTM and RevOps. No vendor bias, no commissions - just expert reporting for revenue teams.',
  keywords: ['CRM', 'GTM', 'RevOps', 'HubSpot', 'Salesforce', 'Pipedrive', 'sales technology', 'CRM news'],
  metadataBase: new URL('https://www.crmdaily.co'),
  openGraph: {
    type: 'website',
    siteName: 'CRM Daily',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', site: '@crmdailyco' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="2867C58B06CE8D9FE5C1532DBDC7B34D" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
        <link rel="apple-touch-icon" href="/favicon-192.png" />
                <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="CRM Daily" />
        <meta name="twitter:site" content="@crmdailyco" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3MQK3D6CK8" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3MQK3D6CK8');
          `}
        </Script>
        <ScrollToTop />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'NewsMediaOrganization',
              '@id': 'https://www.crmdaily.co/#organization',
              'name': 'CRM Daily',
              'url': 'https://www.crmdaily.co',
              'logo': { '@type': 'ImageObject', 'url': 'https://www.crmdaily.co/favicon-192.png' },
              'description': 'CRM Daily is a free daily publication covering CRM, GTM and RevOps intelligence for revenue teams.',
              'foundingDate': '2026',
              'publishingPrinciples': 'https://www.crmdaily.co/about',
              'sameAs': ['https://www.linkedin.com/company/crmdaily', 'https://www.facebook.com/profile.php?id=61591584532423'],
            },
            {
              '@type': 'WebSite',
              '@id': 'https://www.crmdaily.co/#website',
              'url': 'https://www.crmdaily.co',
              'name': 'CRM Daily',
              'publisher': { '@id': 'https://www.crmdaily.co/#organization' },
              'potentialAction': { '@type': 'SearchAction', 'target': 'https://www.crmdaily.co/news?search={search_term_string}', 'query-input': 'required name=search_term_string' },
            }
          ]
        }) }} />
        <TopBar />
        <Navbar />
        <Ticker />
        <StockTicker />
        {children}
        <Footer />
      </body>
    </html>
  );
}
