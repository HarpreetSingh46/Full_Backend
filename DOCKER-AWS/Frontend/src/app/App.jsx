import React from "react";
import "./App.css";
import { useRef, useMemo, useState, useEffect } from "react";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import { Editor } from "@monaco-editor/react";
const App = () => {
  const editorRef = useRef(null);
  const [username, setusername] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || "";
  });


  const  [users,setusers]  = useState([])








  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (username && editorRef.current) {
      const provider = new SocketIOProvider(
        "http://localhost:3000",
        "monaco",
        ydoc,
        {
          autoConnect: true,
        },
      );

      provider.awareness.setLocalStateField("user",{ username})
      provider.awareness.on("change",()=>{

        const states = Array.from(provider.awareness.getStates().values())
        setusers(states.map(state=> state.user).filter(user=> Boolean(user.username)))

      })

      function handleBeforeUnload(){
        provider.awareness.setLocalStateField("user",null)
      }
      window.addEventListener("beforeunload",handleBeforeUnload)



      const monacoBinding = new MonacoBinding(
        yText,
        editorRef.current.getModel(),
        new Set([editorRef.current]),
        provider.awareness,
      )
        return ()=>{
          monacoBinding.destroy()
          provider.disconnect()
          window.removeEventListener("beforeunload",handleBeforeUnload)
        }
    }
  }, [editorRef.current, username]);

  const handleJoin = (e) => {
    e.preventDefault();
    setusername(e.target.username.value);
    window.history.pushState({}, "", "?username=" + e.target.username.value);
  };

  if (!username) {
    return (
      <main className="h-screen w-full items-center justify-center bg-gray-950 flex gap-4 p-4">
        <form onSubmit={handleJoin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your username"
            className="p-2
           rounded-lg bg-gray-800 text-white"
            name="username"
          />
          <button className="p-2  rounded-lg bg-amber-50 text-gray-950 font-bold">
            JOIN
          </button>
        </form>
      </main>
    );
  }
  return (
    <div>
      <main className="h-screen p-4 w-full flex gap-4  bg-gray-950">
        <aside className="h-full  rounded-lg w-2/5 bg-amber-50"></aside>
        <section className="w-3/4 overflow-hidden rounded-lg bg-neutral-800  ">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            theme="vs-dark"
            onMount={handleMount}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
