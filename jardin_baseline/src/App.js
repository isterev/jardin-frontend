
import React from 'react';
import NavigationTabs from "./components/NavigationTabs";
import Grid from '@material-ui/core/Grid';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideLinks from "./components/SideLinks";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import AdsLink from "./components/AdsLink";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Myblogs from "./components/myblogs";
import Home_blogs from "./components/home_blogs";
import Post_blog from "./components/post_blog";
import ItemDetailPage from "./components/ItemDetailPage";



const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#cfdf72"
    },
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={themeLight}>
          <CssBaseline />
          <Header/>
          <Footer/>
        </MuiThemeProvider>
        </Router>
    );
  }
}