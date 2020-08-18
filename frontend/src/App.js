import React from 'react';
import AppBar from './components/AppBar';
import InputForm from './components/InputForm';
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
          <InputForm />
        </div>
      </div>
    )
  }
}

export default App;
