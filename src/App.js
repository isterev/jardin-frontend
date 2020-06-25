"use strict";

import React from 'react';
import NavigationTabs from "./components/NavigationTabs";
import Header from "./components/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";

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
                    <div color={"#cfdf72"} padding-top ='90px' height ={'100%'}>
                        <NavigationTabs/>
                    </div>

            </MuiThemeProvider>
        );
    }
}
