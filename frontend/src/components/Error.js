import React from 'react';

const Error = ({ errorCode, errorMessage }) => {
  return (
    <div>
      <h2>Error</h2>
      <p>Error Code: {errorCode}</p>
      <p>Error Message: {errorMessage}</p>
    </div>
  );
};

export default Error;
