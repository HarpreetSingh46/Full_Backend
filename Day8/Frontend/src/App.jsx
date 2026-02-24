import React, { useEffect, useState } from 'react'
import axios from  "axios"
const App = () => {
  const [notes, setnotes] = useState([])

  function fetchNotes(){

    axios.get('https://localhost:3000/api/notes')
    .then(res=>{
      console.log(res.data)
    })
  }
  useEffect(()=>{
    fetchNotes()
  },[])
  
function HandleSubmit(e){
  e.preventDefault()
  const {title,description}= e.target.elements;
  console.log(title.value,description.value)
}

  return (
    <div>
      <form className='note-create-form'  onSubmit={HandleSubmit}>
        <input name='title' type="text" placeholder='enter title' />
        <input name='description' type="text" placeholder='enter description' id="" />
        <button>Submit</button>
      </form>
      <div className="notes">
        {
          notes.map(note=>{

      return  <div className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
        </div>
          })
        }
      </div>
    </div>
  )
}

export default App
