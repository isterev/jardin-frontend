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
import FilterPane from "./FilterPane";


class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            selectedTab: this.props.location.pathname
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(newValue) {

        this.setState(state => ({
            selectedTab: newValue //location.pathname
        }));

        this.props.history.push(newValue);

    }
    componentDidMount() {
        this.setState({
            title: document.title
        });
    }

    render() {
        let pane;
        if (this.state.selectedTab === "/offers"|| this.state.selectedTab === "/myOffers") {
            pane = <FilterPane/>
        } else {
            pane = <SideLinks/>
        }
        return (
            <section>
                <Header title={this.state.title} selectedTab={this.state.selectedTab} handleTabChange={(value) => this.handleTabChange(value)} />
                <div padding-top='90px' height={'100%'}>
                    <Grid container direction="column">
                        <Grid item container>
                            <Grid item xs={4} sm={2}>
                                {pane}
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <div>
                                    <Box p={3}>
                                        <Typography>{this.props.children}</Typography>
                                    </Box>
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                                <AdsLink/>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
               <Footer/>
            </section>
        );
    }
}

export default withRouter(Page);