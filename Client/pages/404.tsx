import Head from "next/head" ;

// Error
function Error(): JSX.Element
{
  return (
  <>
    <Head>
      <title> 404 | Hangman </title>

      <meta name="description" content="404" />
      <meta name="keywords" content="404" />
    </Head>

    <div className="container-fluid d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center noPageContainer">
      <div className="alignCenter">
        <h1 className="noPageH1"> 404 </h1>
        <h1 className="noPageH2"> PAGE DOES NOT EXISTS! </h1>
      </div>
    </div>
  </>
  ) ;
}

// Export Error
export default Error ;