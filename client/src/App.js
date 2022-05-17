import './App.css';
import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom'
import Register from './components/register';
import Login from './components/login';
import AddEvent from './components/addEvent';
import EventFeed from './components/event.feed';
import Edit from './components/edit';
import All from './components/allEvents';
import AddPhoto from './components/addPhoto';
import ErrorPage from './components/errorPage';
import Location from './components/location';




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
          <Route path='/getall' element = {<All/>}/>
          <Route path='/addpost/:id' element = {<AddPhoto/>}/>
          <Route path="/error" element={<ErrorPage/>}/>
          <Route path='/map/:streetNumber/:streetName/:streetType/:city/:state' element={<Location/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
