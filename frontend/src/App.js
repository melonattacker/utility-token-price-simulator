import React from 'react';
import AppBar from './components/AppBar';
import Form from './components/Form';
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
        <div className="App">
          <Form />
        </div>
      </div>
    )
  }
}

export default App;
