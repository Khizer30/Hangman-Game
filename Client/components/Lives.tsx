import Image from "next/image" ;
import img0 from "../public/images/0.svg" ;
import img1 from "../public/images/1.svg" ;
import img2 from "../public/images/2.svg" ;
import img3 from "../public/images/3.svg" ;
import img4 from "../public/images/4.svg" ;
import img5 from "../public/images/5.svg" ;

// Lives Props Interface
interface LivesProps
{
  health: number
} ;

// Lives
function Lives(props: LivesProps): JSX.Element
{
  // Select Image
  let img: string = "" ;

  switch(props.health)
  {
    case 0:
      img = img0 ;
      break ;
    case 1:
      img = img1 ;
      break ;
    case 2:
      img = img2 ;
      break ;
    case 3:
      img = img3 ;
      break ;
    case 4:
      img = img4 ;
      break ;
    case 5:
      img = img5 ;
      break ;
    default:
      img = img1 ;
      break ;
  }

  return (
  <>
    <div className="d-flex justify-content-center align-items-center">
      <div className="homeImage">
        <Image src={ img } alt="Lives" title="Lives" objectPosition="center" draggable="false" priority />
      </div>
    </div>
  </>
  ) ;
}

// Export Lives
export default Lives ;