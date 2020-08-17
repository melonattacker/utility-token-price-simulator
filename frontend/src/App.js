import React from 'react';
import AppBar from './AppBar';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <header>
          <AppBar />
        </header>
      </div>
    )
  }
}

export default App;
