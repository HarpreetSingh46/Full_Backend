import React from 'react'
import "./App.css"
import {Editor} from '@monaco-editor/react'
const App = () => {
  return (
  <div>
      <main className='h-screen p-4 w-full flex gap-4  bg-gray-950'>
        <aside className='h-full  rounded-lg w-2/5 bg-amber-50'>
        </aside>
        <section className='w-3/4 overflow-hidden rounded-lg bg-neutral-800  '>
          <Editor
          height="100%"
          defaultLanguage='javascript'
          defaultValue='// some comment'
          theme='vs-dark'
          />
        </section>
      </main>
  </div>
  )
}

export default App
