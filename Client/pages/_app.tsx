import Navbar from "../components/Navbar" ;
import Head from "next/head" ;
import "../styles/styles.css" ;

// App
function App({ Component, pageProps }): JSX.Element
{
  return (
  <>
    <Head>
      <link rel="shortcut icon" type="image/x-icon" href="../images/logo.svg" />
      <link rel="icon" type="image/x-icon" href="../images/logo.svg" />
    </Head>

    <Navbar />
    <Component { ...pageProps } />
  </>
  ) ;
}

// Export App
export default App ;