
import React from 'react';
import NavigationTabs from "./components/NavigationTabs";
import Grid from '@material-ui/core/Grid';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideLinks from "./components/SideLinks";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import AdsLink from "./components/AdsLink";

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
        <MuiThemeProvider theme={themeLight}>
          <CssBaseline />
          <Header/>
          <div  padding-top ='90px' height ={'100%'}>
              <Grid container direction="column">
                  <Grid item container>
                      <Grid item xs={4} sm={2} >
                          <SideLinks/>
                      </Grid>
                      <Grid item xs={8} sm={8} >
                          <NavigationTabs/>
                      </Grid>
                      <Grid item xs={4} sm={2}>
                          <AdsLink/>
                          </Grid>
                  </Grid>
              </Grid>
          </div>
          <Footer/>

        </MuiThemeProvider>
    );
  }
}