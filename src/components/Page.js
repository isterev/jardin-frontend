"use strict";

import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Grid from "@material-ui/core/Grid";
import SideLinks from "./SideLinks";
import AdsLink from "./AdsLink";


export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    componentDidMount() {
        this.setState({
            title: document.title
        });
    }

    render() {
        return (
            <section>
                <Header title={this.state.title}/>
                <div padding-top='90px' height={'100%'}>
                    <Grid container direction="column">
                        <Grid item container>
                            <Grid item xs={4} sm={2}>
                                <SideLinks/>
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                {this.props.children}
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

