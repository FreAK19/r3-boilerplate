import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from './components/Logo/Logo';
import './App.less'

export default class App extends Component {
  state = {};

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <Logo />
          <h1>Hello world</h1>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
