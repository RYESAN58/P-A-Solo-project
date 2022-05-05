import './App.css';

function App() {
  return (
    <div className="App">
      <div className='Nav'>
        <div>
          <span className='Color'>
            PhotoCred
          </span>
        </div>
        <div className='Navy'>
        </div>
        <div className="wrap">
          <div className="search">
            <input type="text" className="searchTerm" placeholder="What are you looking for?"/>
            <button type="submit" className="searchButton">
              SEARCH
            </button>
          </div>
</div>
      </div>
    </div>
  );
}

export default App;
