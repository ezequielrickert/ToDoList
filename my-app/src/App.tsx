import React from 'react';
import './App.css';
import List from './List';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <h1> Today's List </h1>
            <div className="list-box">
                <List/>
            </div>
        </header>
    </div>
  );
}

export default App;