import { useState, useEffect } from "react" ;
import Head from "next/head" ;
import Message from "../components/Message" ;

// Interfaces
interface Input
{
  word: string
  hint: string
  question: string
} ;

interface ResObj
{
  word: string
  hint: string
} ;

interface ServerRes
{
  code: string
  message: string
} ;

// Edit
function Edit(): JSX.Element
{
  // Variables
  const obj: Input =
  {
    word: "",
    hint: "",
    question: "NULL"
  } ;

  const [inputs, setInputs] = useState(obj) ;
  const [questions, setQuestions] = useState<string[]>([]) ;
  // ...
  const [mes, setMes] = useState("NULL") ;
  const [type, setType] = useState("alert-danger") ;

  // Handle Change
  const handleChange = (event: any): void =>
  {
    if (event.target.name === "word" && event.target.value !== "")
    {
      setInputs(values => ({ ...values, [event.target.name]: event.target.value.toUpperCase() })) ;
    }
    else
    {
      setInputs(values => ({ ...values, [event.target.name]: event.target.value })) ;
    }
  }
  
  // Handle Bug
  const handleSubmit = (event: any): void =>
  {
    event.preventDefault() ;
  }

  // Mapper
  const mapper = (x: string): JSX.Element =>
  {
    return(
    <>
      <option value={ x } className="bold"> { x } </option>
    </>
    ) ;
  }

  // Check Input
  const checkIt = (it: string, len: number, reg: string): boolean =>
  {
    if (it !== "")
    {
      if (it.length <= len)
      {
        let pattern: RegExp = new RegExp(reg) ;

        if (pattern.test(it))
        {
          return true ;
        }
        else
        {
          setType("alert-danger") ;
          setMes("Input is Invalid!") ;
          return false ;
        }
      }
      else
      {
        setType("alert-danger") ;
        setMes("Input is Lengthy!") ;
        return false ;
      }
    }
    else
    {
      setType("alert-danger") ;
      setMes("Input Field is Empty!") ;
      return false ;
    }
  }

  // Get Data
  const getData = async (url: string = ""): Promise<void> =>
  {
    const response: Response = await fetch(url, 
      {
        mode: "cors",
        method: "GET",
        headers: 
        {
          "Content-Type": "application/json"
        }
      }) ;
  
      let res: ServerRes = await response.json() ;
  
      // Display Response
      if (res.code === "200")
      {
        // Display Questions
        let message: ResObj[] = JSON.parse(res.message) ;
        let ques: string[] = [] ;
        for (let x of message)
        {
          ques.push(x.word) ;
        }
        setQuestions(ques) ;
      }
      else
      {
        setType("alert-danger") ;
        setMes(res.message) ;
      }
  }

  // Post Data
  const postData = async (url: string = "", data: object = {}): Promise<void> =>
  {
    const response: Response = await fetch(url, 
    {
      mode: "cors",
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }) ;

    let res: ServerRes = await response.json() ;

    // Display Response
    if (res.code === "100" || res.code === "300")
    {
      setType("alert-success") ;
      setMes(res.message) ;
    }
    else
    {
      setType("alert-danger") ;
      setMes(res.message) ;
    }
  }

  // Add Word
  const add = (): void =>
  {
    if (checkIt(inputs.word, 25, "^[A-Z]*$") &&
    checkIt(inputs.hint, 100, "^[a-zA-Z].*[\s\.]*$"))
    {
      postData("https://hangman-786.el.r.appspot.com/add", { word: inputs.word, hint: inputs.hint }) ;
      setInputs({ word: "", hint: "", question: "NULL"}) ;
    }
  }

  // Remove Word
  const remove = (): void =>
  {
    if (inputs.question !== "NULL")
    {
      postData("https://hangman-786.el.r.appspot.com/remove", { question: inputs.question }) ;
      setInputs({ word: "", hint: "", question: "NULL"}) ;
    }
    else
    {
      setType("alert-danger") ;
      setMes("Select a Question to Delete!") ;
    }
  }

  // Set Questions
  useEffect(() =>
  {
    setQuestions([]) ;
    getData("https://hangman-786.el.r.appspot.com/questions") ;
  }, [mes]) ;

  return (
  <>
    <Head>
      <title> Edit | Hangman </title>
    </Head>

    <div className="container-fluid mainContainer">

      <h1 className="heading marginTB"> ADD / DELETE QUESTION </h1>

      <Message message={ mes } type={ type } />

      <div>
        <form method="post" target="_self" encType="application/x-www-form-urlencoded" 
        autoComplete="off" noValidate onSubmit={ handleSubmit }>

          <div className="form-floating mt-3 mb-3">
            <input name="word" type="text" maxLength={ 25 } minLength={ 1 }  pattern="^[A-Z]*$" 
            placeholder="Enter The Word" inputMode="text" required autoFocus className="form-control width100 bold marginTB upperCase"
            onChange={ handleChange } value={ inputs.word } />
            <label htmlFor="word" className="bold"> Enter The Word </label>
          </div>

          <div className="form-floating mt-3 mb-3">
            <input name="hint" type="text" maxLength={ 100 } minLength={ 1 }  pattern="^[a-zA-Z].*[\s\.]*$" 
            placeholder="Enter The Hint" inputMode="text" required className="form-control width100 bold marginTB"
            onChange={ handleChange } value={ inputs.hint } />
            <label htmlFor="hint" className="bold"> Enter The Hint </label>
          </div>

          <div>
            <button onClick={ add } type="button" className="marginTB homeBtn"> Add </button>
          </div>

        </form>
      </div>
      <div>
        <form method="post" target="_self" encType="application/x-www-form-urlencoded" 
        autoComplete="off" noValidate onSubmit={ handleSubmit }>

          <div className="form-floating mt-3 mb-3">
            <select name="question" required className="form-select marginTB bold width100"
            onChange={ handleChange } value={ inputs.question }>
              <option value="NULL" className="displayNone"></option>
              {
                questions.map(mapper)
              }
            </select>
            <label htmlFor="question" className="bold"> Select a Question </label>
          </div>

          <div>
            <button onClick={ remove } type="button" className="marginTB homeBtn"> Delete </button>
          </div>

        </form>
      </div>
    </div>
  </>
  ) ;
}

// Export Edit
export default Edit ;