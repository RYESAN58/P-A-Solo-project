import './App.css';
import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse, faArrowCircleRight, faClipboard} from "@fortawesome/free-solid-svg-icons"
import Register from './components/register';
import Login from './components/login';
import AddEvent from './components/addEvent';
import EventFeed from './components/event.feed';
import Edit from './components/edit';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path='/all' element={<AddEvent/>}/>
          <Route path='/details/:id' element={<EventFeed/>}/>
          <Route path='edit/:id' element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
