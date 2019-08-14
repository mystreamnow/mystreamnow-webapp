import React, { Fragment } from 'react';

import ErrorType1500 from './1500';

const Error = ({ code }) => {
  const Notification = code => {
    switch (code) {
      case 1500:
        return <ErrorType1500 />;
      default:
        return null;
    }
  };

  return (
    <Fragment>
      {Notification(code)}
    </Fragment>
  );
};

export default Error;
