const express = require("express") ;
const cors = require("cors") ;
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app") ;
const { getFirestore } = require("firebase-admin/firestore") ;
const { json } = require("express") ;

// ...
const serviceAccount = require("./credential.json") ;

const app = express() ;
const port = process.env.PORT || 8080 ;

// Middleware
app.use(cors()) ;
app.use(json()) ;

// ...
initializeApp({ credential: cert(serviceAccount) }) ;

// Firestore
// initializeApp({ credential: applicationDefault() }) ;
const db = getFirestore() ;

// Check Input
function checkIt(it: string, len: number, reg: string): boolean
{
  let pattern: RegExp = new RegExp(reg) ;

  if ((it !== "") && (it.length <= len) && (pattern.test(it)))
  {
    return true ;
  }
  else
  {
    return false ;
  }
}

// Create Response
function createRes(a: string, b: string): string
{
  let x: string = JSON.stringify({ code: a, message: b }) ;

  return x ;
}

// Add Question
app.post("/add", async (req, res) =>
{
  // Add Request Interface
  interface AddReq
  {
    word: string
    hint: string
  } ;

  let inputs: AddReq = req.body ;

  if (checkIt(inputs.word, 25, "^[A-Z]*$") &&
  checkIt(inputs.hint, 100, "^[a-zA-Z].*[\s\.]*$"))
  {
    const obj: object =
    {
      hint: inputs.hint
    } ;
  
    // Write
    await db.collection("questions").doc(inputs.word).set(obj) ;
  
    // Response
    res.end(createRes("100", `${ inputs.word } Added To Database!`)) ;
  }
  else
  {
    // Response
    res.end(createRes("101", "Invalid Inputs!")) ;
  }
})

// Delete Question
app.post("/remove", async (req, res) =>
{
  // Remove Request Interface
  interface RemoveReq
  {
    question: string
  } ;

  let inputs: RemoveReq = req.body ;

  if (checkIt(inputs.question, 25, "^[A-Z]*$"))
  {
    // Delete
    await db.collection("questions").doc(inputs.question).delete() ;

    // Response
    res.end(createRes("300", `${ inputs.question } Deleted From Database!`)) ;
  }
  else
  {
    // Response
    res.end(createRes("301", "Invalid Inputs!")) ;
  }
})

// Get Questions
app.get("/questions", async (req, res) =>
{
  // Questions Interface
  interface Questions
  {
    word: string
    hint: string
  } ;

  const snapshot = await db.collection("questions").get() ;
  let objArr: Questions[] = [] ;

  if (!snapshot.empty)
  {
    let obj: Questions = { word: "", hint: "" } ;

    snapshot.forEach((doc) =>
    {
      obj =
      {
        word: doc.id,
        hint: doc.data().hint
      } ;

      objArr.push(obj) ;
    })

    // Response
    res.end(createRes("200", JSON.stringify(objArr))) ;
  }
  else
  {
    // Response
    res.end(createRes("201", JSON.stringify(objArr))) ;
  }
})

// Server
app.listen(port, () =>
{
  console.log(`Server Started at Port: ${ port }`) ;
})