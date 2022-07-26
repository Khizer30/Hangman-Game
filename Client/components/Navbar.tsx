import React from "react" ;
import Link from "next/link" ;
import Image from "next/image" ;
import logo from "../public/images/logo.svg" ;

// Navbar
function Navbar(): JSX.Element
{
  return (
  <>
    <nav className="navbar navbar-light navbar-expand navBar">
      <div className="container-fluid">
        <div className="logo cursor">
          <Link href="/" prefetch={ true }>
            <Image src={ logo } alt="Hangman Logo" title="Home" draggable="false" priority />
          </Link>
        </div>
      </div>
    </nav>
  </>
  ) ;
}

// Export Navbar
export default Navbar ;