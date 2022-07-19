import { useState } from "react" ;
import Head from "next/head" ;
import Lives from "../components/Lives" ;
import Message from "../components/Message" ;

// Interfaces
interface ServerRes
{
  code: string
  message: string
} ;

interface ResObj
{
  word: string
  hint: string
} ;

interface Question
{
  word: string
  hidden: string
  hint: string
  used: string[]
  lives: number
  game: boolean
} ;

interface SSRProps
{
  message: ResObj[]
}

// SSR Props
export async function getServerSideProps()
{
  const response: Response = await fetch("https://hangman-786.el.r.appspot.com/questions", 
  {
    mode: "cors",
    method: "GET",
    headers: 
    {
      "Content-Type": "application/json"
    }
  }) ;

  let res: ServerRes = await response.json() ;
  let message: ResObj[] = JSON.parse(res.message) ;

  return { props: { message } } ;
}

// Home
function Home(props: SSRProps): JSX.Element
{
  // Variables
  const obj: Question =
  {
    word: "",
    hidden: "",
    hint: "",
    used: [],
    lives: 4,
    game: true
  } ;

  const [start, setStart] = useState(false) ;
  const [char, setChar] = useState("") ;
  const [question, setQuestion] = useState(obj) ;
  let questions: ResObj[] = props.message ;
  // ...
  const [mes, setMes] = useState("NULL") ;
  const [type, setType] = useState("alert-danger") ;

  // Handle Change
  const handleChange = (event: any): void =>
  {
    let value: string = event.target.value ;

    if (value === "")
    {
      setChar(value[0]) ;
    }
    else
    {
      setChar(value[0].toUpperCase()) ;
    }
  }

  // Handle Submit
  const handleSubmit = (event: any): void =>
  {
    event.preventDefault() ;

    // Reset
    setMes("NULL") ;

    if (char !== "")
    {
      if (!question.used.includes(char))
      {
        if (question.word.includes(char))
        {
          question.used.push(char) ;

          // Replace
          let hid: string = question.hidden ;
          for (let i: number = 0; i < question.word.length; i++)
          {
            if (question.word[i] === char)
            {
              hid = hid.substring(0, i) + question.word[i] + hid.substring(i + 1) ;
            }
          }
          question.hidden = hid ;

          // Check Win
          let win: boolean = true ;
          for (let i: number = 0; i < question.word.length; i++)
          {
            if (question.word[i] !== question.hidden[i])
            {
              win = false ;
            }
          }

          if (win)
          {
            question.hint = "YOU WON!" ;
            question.lives = 5 ;
            question.game = false ;
          }
        }
        else
        {
          question.used.push(char) ;

          // Change Image
          question.lives-- ;

          // Check Lost
          if (question.lives === 0)
          {
            question.hidden = question.word ;
            question.hint = "YOU LOST!" ;
            question.game = false ;
          }
        }
      }
      else
      {
        setType("alert-danger") ;
        setMes("Alphabet Already Used!") ;
      }

      setChar("") ;
    }
    else
    {
      setType("alert-danger") ;
      setMes("Enter a Letter!") ;
    }
  }

  // Set Game
  const setGame = (): void =>
  {
    // Reset
    setStart(true) ;
    setChar("") ;
    setMes("NULL") ;

    let index: number = Math.floor(Math.random() * questions.length) ;
    let theQuestion: ResObj = questions[index] ;

    // Create Hidden Array
    let hid: string = "" ;
    for (let i: number = 0; i < theQuestion.word.length; i++)
    {
      hid += "*" ;
    }

    setQuestion({ word: theQuestion.word, hidden: hid, hint: theQuestion.hint, used: [], lives: 4, game: true }) ;
  }

  // Map Used
  const usedMapper = (x: string): JSX.Element =>
  {
    return (
    <>
      { "   " + x + "   " }
    </>
    ) ;
  }

  return (
  <>
    <Head>
      <title> Home | Hangman </title>

      <meta name="description" content="Hangman Game Homepage" />
      <meta name="keywords" content="Hangman, Game, Homepage" />
    </Head>

  { (!start) &&
    <div className="container-fluid startContainer">
      <div className="startDiv">
        <h1 className="startH1"> Welcome To HANGMAN </h1>
        <h1 className="startH2"> Are You Willing To Risk Your Life? </h1>
        <button onClick={ setGame } type="button" className="startBtn"> Start Game </button>
      </div>
    </div>
  }
  { (start) &&
    <div className="container-fluid marginTB alignCenter">
      
    { (question.game) &&
      <div className="resetDiv">
        <button onClick={ setGame } type="button" className="resetBtn">
          <i className="fas fa-redo resetIcon"></i> Reset
        </button>
      </div>
    }

      <div>
        <h1 className="homeWord"> { question.hidden } </h1>
        <p className="homeHint"> { question.hint } </p>
      </div>

      <div>
      { (question.game) &&
        <div>
          <form method="post" target="_self" encType="application/x-www-form-urlencoded" 
          autoComplete="off" noValidate onSubmit={ handleSubmit }>

            <Message message={ mes } type={ type } />

            <div className="form-floating mt-3 mb-3">
              <input name="char" type="text" maxLength={ 1 } pattern="^[A-Z]*$" 
              placeholder="Enter a Letter" inputMode="text" required autoFocus className="form-control homeInput"
              onChange={ handleChange } value={ char } />
              <label htmlFor="char" className="homeLabel"> Enter a Letter </label>
            </div>

            <p className="homeUsed"> { (question.used.length === 0) ? <br /> : question.used.map(usedMapper) } </p>

          </form>
        </div>
      }
      { (!question.game) &&
        <div>
          <button onClick={ setGame } type="button" className="homeBtn"> Play Again </button>
        </div>
      }

        <Lives health={ question.lives } />

      </div>
    </div>
  }
  </>
  ) ;
}

// Export Home
export default Home ;