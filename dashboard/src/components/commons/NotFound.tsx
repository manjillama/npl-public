import React from 'react';

const NotFound = (): JSX.Element => (
  <div className="container-sm" style={{ marginTop: '4rem' }}>
    <h1>Oops something went wrong!</h1>
    <p style={{ margin: '1rem 0px 1.5rem' }}>
      We&apos;re really sorry either the page your looking for doesn&apos;t exist or you don&apos;t
      have sufficient permission.
    </p>
    <a href="/" className="btn btn-primary">
      Return Home
    </a>
    <br />
    <br />
    <br />
  </div>
);

export const ErrorMessage = (): JSX.Element => (
  <div className="alert alert-danger">
    <h4 style={{ fontSize: '1.3rem' }}>
      <i className="fas fa-info-circle"></i> Oops something went wrong!
    </h4>
  </div>
);

export default NotFound;
