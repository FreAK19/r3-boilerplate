import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from './components/Logo/Logo';
import './App.less'

export default class App extends Component {
  state = {};

  render() {
    return (
      <MuiThemeProvider>
        <>
          <Logo />
          <h1>Start coding now</h1>
        </>
      </MuiThemeProvider>
    );
  }
}
