import React from 'react';
import AppBar from '../AppBar';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import '../../App.css';

const styles = (theme) => ({
    root: {
      marginLeft: 315,
      marginRight: 315
    },
    imgFrame: {
      marginTop: 30,
      marginLeft: 90
    },
    buttonFrame: {
      marginTop: 30,
      marginLeft: 345,
      height: 50,
      width: 200,
    },
    button: {
      height: 50,
      width: 130,
      fontSize: 17,
      background: theme.palette.info.main
    },
    progress: {
      float: 'right'
    }
});

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        prices: [],
        img: ""
    }
    this.state.prices = this.props.location.state.prices;
    this.state.img = this.props.location.state.img;
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload() {
    const str = this.state.prices.join(',\n');
    const blob = new Blob([str], {"type": "text/csv"});

    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'hoge.csv'
    link.click()
  }

  render() {
    const { classes } = this.props; 
    return(
      <div>
        <header>
          <AppBar />
        </header>
        <div className={classes.root}>
            <div className={classes.imgFrame}>
                <img src={`data:image/jpeg;base64,${this.state.img}`}></img>
            </div>
            <div className={classes.buttonFrame}>
                <Button className={classes.button} variant="contained" color="primary" onClick={this.handleDownload}>csv</Button>
            </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Result);
