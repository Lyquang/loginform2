 import './App.css'
import Home from "./components/Authentication/Home"
import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import UploadPage from './components/Upload/Upload'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import './index.css';
import ChatApp from './components/Chatapp/chat'
//import './components/Upload/uploadPage.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/upload" element={<UploadPage/>}/>
          <Route path="/chat" element={<ChatApp/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;