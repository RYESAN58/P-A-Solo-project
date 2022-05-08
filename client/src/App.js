import './App.css';

function App() {
  return (
    <div className="App">
      <nav className='Nav navbar'>
        <div>
          <span className='Color'>
            PhotoCred
          </span>
        </div>
        <div className='Navy'>
          <div className='inner'>
            Home
          </div>
          <div className='inner' >
            Events
          </div>
          <div className='inner' >
            About
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
    </div>
  );
}

export default App;
