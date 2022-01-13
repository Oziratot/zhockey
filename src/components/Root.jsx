import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header/Header';

const Root = function ({ Component, pageProps }) {
  const [clientWindowWidth, setClientWindowWidth] = useState(false);
  const [orderCallModalActive, setlOrderCallModalActive] = useState(false);
  const handleOrderCallClick = useCallback(() => setlOrderCallModalActive(true), []);
  const handleModalClose = useCallback(() => setlOrderCallModalActive(false), []);

  const handleWidthChange = () => {
    setClientWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setClientWindowWidth(window.innerWidth);
    }
  }, []);

  pageProps['clientWindowWidth'] = clientWindowWidth;

  useEffect(() => {
    window.addEventListener('resize', handleWidthChange);
    return () => window.removeEventListener('resize', handleWidthChange);
  });

  return (
    <>
      <Header orderCallClick={handleOrderCallClick} windowWidth={clientWindowWidth} />
      <main>
        <Component
          handleModalClose={handleModalClose}
          orderCallModalActive={orderCallModalActive}
          handleOrderCallClick={handleOrderCallClick}
          clientWindowWidth={clientWindowWidth}
          {...pageProps}
        />
      </main>
    </>
  );
};

export default Root;
