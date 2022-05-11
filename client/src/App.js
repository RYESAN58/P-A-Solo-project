import './App.css';
import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse, faArrowCircleRight, faClipboard} from "@fortawesome/free-solid-svg-icons"
import Register from './components/register';
import { useState } from 'react';
import Login from './components/login';
import AddEvent from './components/addEvent';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className='Nav navbar'>
          <div>
            <span className='Color'>
              PhotoCred
            </span>
          </div>
          <div className='Navy'>
            <div className='inner'>
              <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
              <span className='headcon' >Home</span>
            </div>
            <div className='inner' >
            <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon>
            <span className='headcon'>Register</span>
            </div>
            <div className='inner' >
              <FontAwesomeIcon icon={faArrowCircleRight}></FontAwesomeIcon>
              <span className="headcon">Login</span>
            </div>
          </div>
          <div className="wrap">
            <div className="search">
              <input type="text" className="searchTerm form-control me-2" placeholder="What are you looking for?" />
              <button type="submit" className="btn btn-outline-primary">
                SEARCH
              </button>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path='/all' element={<AddEvent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
