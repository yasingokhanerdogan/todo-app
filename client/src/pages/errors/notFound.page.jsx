import React from "react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 | Todo Uygulaması</title>
        <meta name="description" content="404 | Todo Uygulaması"/>
        <meta name="googlebot" content="noindex" />
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="page-content">
        <div className="container">
          <div className="row vh-100 d-flex align-items-center justify-content-center">
            <h3 className="text-center">Sayfa Bulunamadı!</h3>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
