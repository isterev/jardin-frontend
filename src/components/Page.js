"use strict";

import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Grid from "@material-ui/core/Grid";
import SideLinks from "./SideLinks";
import AdsLink from "./AdsLink";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles((theme) => ({
    tabs:{
        height:40,
        width:'100%',
        backgroundColor:"#367c55",
    },
}));

export default function Page() {
        const classes = styles();
        return (
            <section>
                <Header/>
                <div  className={classes.tabs}>
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
                </div>
               <Footer/>
            </section>
        );
    }