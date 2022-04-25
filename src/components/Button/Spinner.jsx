import React from 'react';

import SpinnerIcon from '../../assets/svg/spinner-18.svg';

export default function Spinner() {
  return (
    <span className="ui-button-spinner">
      <SpinnerIcon className="ui-button-spinner-svg" />
    </span>
  );
}
