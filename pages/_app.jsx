import React from 'react';
import 'react-phone-input-2/lib/bootstrap.css';
import Head from 'next/head';
import '../styles/app.scss';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import Root from '../src/components/Root';

const YMetrikaScript = {
  __html: `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
     m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
     (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
     ym(48349664, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
     });
  `,
};

const GTagScript = {
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-116931678-1');
  `,
};

const FbPixelScript = {
  __html: `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
     fbq('init', '309390946541081');
     fbq('track', 'PageView');
  `,
};

const LogoStructuredData = {
  __html: `
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "https://ghockey.ru/",
      "logo": "https://ghockey.ru/assets/img/GHA-og-logo.png"
    }
  `,
};

const OrganizationStructuredData = {
  __html: `
    {
      "@context": "https://schema.org",
      "@type": "SportsOrganization",
      "image": ["https://ghockey.ru/assets/img/GHA-og-logo.png"],
      "@id": "https://ghockey.ru/#organization",
      "name": "Grishatov Hockey Agency",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Новоостаповская, 5 стр. 2",
        "addressLocality": "Москва",
        "addressRegion": "МО",
        "postalCode": "115088",
        "addressCountry": "Russia"
      },
      "url": "https://ghockey.ru/contacts",
      "telephone": "+79160791214",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ]
    }
  `,
};

const MyApp = function ({ Component, pageProps }) {
  return (
    <>
      <Head>
        {process.env.NODE_ENV === 'production' && (
          <>
            <meta name="yandex-verification" content="02bb13a9cb19fdbc" />
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-116931678-1" />
            <script type="text/javascript" dangerouslySetInnerHTML={GTagScript} />
            <script type="text/javascript" dangerouslySetInnerHTML={YMetrikaScript} />
            <script type="text/javascript" dangerouslySetInnerHTML={FbPixelScript} />
          </>
        )}
        <title>Хоккейная школа Grishatov Hockey</title>
        <meta name="description" content="Хоккейная школа Grishatov Hockey" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" />
        <link rel="preload" href="/fonts/Roboto-Light.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Roboto-Regular.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Roboto-Medium.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Roboto-Bold.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Oswald-Medium.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Oswald-Bold.woff2" as="font" crossOrigin="" />
      </Head>
      <Root Component={Component} pageProps={pageProps} />
    </>
  );
};

export default MyApp;
