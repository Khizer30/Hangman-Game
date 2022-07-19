import { Html, Head, Main, NextScript } from "next/document" ;
import Script from "next/script" ;
import Footer from "../components/Footer" ;

// Document
function Document(): JSX.Element
{
  return (
  <>
    <Html>
      <Head>
        <meta name="author" content="Syed Muhammad Khizer" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato&amp;display=swap" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
      </Head>

      <body className="theBody">
        <Main />
        <Footer />

        <NextScript />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
      </body>
    </Html>
  </>
  ) ;
}

// Export Document
export default Document ;