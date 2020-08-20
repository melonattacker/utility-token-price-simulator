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
      marginLeft: 300,
      height: 50,
      width: 400,
    },
    imgButton: {
      height: 50,
      width: 100,
      fontSize: 17,
      marginRight: 40,
      background: theme.palette.info.main
    },
    csvButton: {
      height: 50,
      width: 100,
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
    this.handleImgDownload = this.handleImgDownload.bind(this);
    this.handleCsvDownload = this.handleCsvDownload.bind(this);
  }

  handleCsvDownload() {
    const str = this.state.prices.join(',\n');
    const blob = new Blob([str], {"type": "text/csv"});

    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'prices.csv'
    link.click()
  }

  handleImgDownload() {
    const img = this.state.img;

    let link = document.createElement('a')
    link.href = "data:image/png;base64," + img;
    link.download = 'prices.png'
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
                <img src={`data:image/png;base64,${this.state.img}`}></img>
            </div>
            <div className={classes.buttonFrame}>
                <Button className={classes.imgButton} variant="contained" color="primary" onClick={this.handleImgDownload}>image</Button>
                <Button className={classes.csvButton} variant="contained" color="primary" onClick={this.handleCsvDownload}>csv</Button>
            </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Result);
