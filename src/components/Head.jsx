import React, { memo } from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Head = ({ title, desc, page, breadcrumbsData, children }) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={desc} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:image:alt" content={title} />
    <meta name="twitter:description" content={desc} />
    <meta name="og-title" property="og:title" content={title} />
    <meta name="og-description" property="og:description" content={desc} />
    <meta name="og-url" property="og:url" content={`https://zhockey.ru${page}`} />
    <link rel="canonical" href={`https://zhockey.ru${page}`} />
    {breadcrumbsData && <script name="structured-data-breadcrumb-list" type="application/ld+json" dangerouslySetInnerHTML={breadcrumbsData} />}
    {children}
  </NextHead>
);

Head.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  breadcrumbsData: PropTypes.shape({ __html: PropTypes.string }),
};

export default memo(Head);
