import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GroupChat from "./components/GroupChat";
import ChatUI from "./components/GroupChatUI";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Landing} />
          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/contact" component={Contact} /> */}
        </Routes>
      </Router>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <h1 className="text-3xl font-bold underline text-red-600">
            Simple React Typescript Tailwind Sample
          </h1>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <GroupChat /> 
         <ChatUI />
      </div> */}
    </>
  );
}

export default App;
