import React from 'react';
import AppBar from '../AppBar';
import Form from './Form';
import '../../App.css';

class Setting extends React.Component {
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

export default Setting;
