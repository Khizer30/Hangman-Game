import Image from "next/image" ;
import Head from "next/head" ;
import logo from "../public/images/logo.svg" ;

// Animation
function Animation(): JSX.Element
{
  return (
  <>
    <Head>
      <title> Animation | Hangman </title>

      <meta name="description" content="Animation" />
      <meta name="keywords" content="Animation" />
    </Head>

    <div className="d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center aniDiv">
      <div className="aniObject">
        <Image src={ logo } alt="Hangman Logo" draggable="false" priority /> 
      </div>
    </div>
  </>
  ) ;
}

// Export Animation
export default Animation ;