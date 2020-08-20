import React from 'react';
import AppBar from '../AppBar';
import '../../App.css';

class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.location.state);
  }

  render() {
    return(
      <div>
        <header>
          <AppBar />
        </header>
        <div className="App">
        </div>
      </div>
    )
  }
}

export default Result;
