import React from "react";
import "./App.css";
import { useRef, useMemo, useState, useEffect } from "react";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";
import { SocketIOProvider } from "y-socket.io";
import { Editor } from "@monaco-editor/react";
import { use } from "react";

const App = () => {
  const editorRef = useRef(null);
  const [username, setusername] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || "";
  });

  const [users, setusers] = useState([]);

  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc]);

  const handleMount = (editor) => {
    editorRef.current = editor;
    new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current])
    );
  };

  useEffect(() => {
    if (username) {
      const provider = new SocketIOProvider(
        "http://localhost:3000",
        "monaco",
        ydoc,
        {
          autoConnect: true,
        }
      );

      provider.awareness.setLocalStateField("user", { username });

      const states = Array.from(provider.awareness.getStates().values());

      setusers(
        states
          .filter(state => state.user && state.user.username)
          .map(state => state.user)
      );

      provider.awareness.on("change", () => {
        const states = Array.from(provider.awareness.getStates().values());

        setusers(
          states
            .filter(state => state.user && state.user.username)
            .map(state => state.user)
        );
      });

      function handleBeforeUnload() {
        provider.awareness.setLocalStateField("user", null);
      }
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        provider.disconnect();
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [username]);

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
            className="p-2 rounded-lg bg-gray-800 text-white"
            name="username"
          />
          <button className="p-2 rounded-lg bg-amber-50 text-gray-950 font-bold">
            JOIN
          </button>
        </form>
      </main>
    );
  }

  return (
    <div>
      <main className="h-screen p-4 w-full flex gap-4 bg-gray-950">
        <aside className="h-full rounded-lg w-2/5 bg-amber-50">
          <h2 className="text-2xl font-bold p-4 border-b border-gray-300">
            Users
          </h2>
          <ul className="p-4">
            {users.map((user, index) => (
              <li
                key={index}
                className="p-2 bg-gray-800 text-white rounded mb-2"
              >
                {user.username}
              </li>
            ))}
          </ul>
        </aside>

        <section className="w-3/4 overflow-hidden rounded-lg bg-neutral-800">
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