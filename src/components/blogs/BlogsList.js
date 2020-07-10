"use strict";

import React from 'react';
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";

import Page from '../Page'
import UserService from "../../services/UserService";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        //backgroundColor: theme.palette.background.paper,
    },
    list: {
        width: 700,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: '25%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class BlogsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }
    }

    render() {

        const {classes} = this.props;
        return (
            <Page>
                <div className={classes.root}>

                    <div className={classes.list}>

                    <header style={{}}>
                        <p><b> Top Picks for today </b></p>
                        <br></br>
                        <a
                            href="https://google.com"
                            target="_blank"
                        >
                            Tips and tricks for good harvest
                        </a>

                        <span style={{paddingLeft: '250px'}}>
                            <span>  <Button color='primary'> Edit  </Button> </span>
                            <span>  <Button color='primary'> Share </Button> </span>
                            <span>  <Button color='primary'> Delete </Button> </span>
                        </span>

                        <p><b> Peter Miller, 22nd May 2020</b></p>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
                        <br></br>
                        <a
                            href="https://reactjs.org"
                            target="_blank"
                        >
                            How to use gardening tools?
                        </a>

                        <span style={{paddingLeft: '275px'}}>
                            <span>  <Button color='primary'> Edit </Button> </span>
                            <span>  <Button color='primary'> Share </Button> </span>
                            <span>  <Button color='primary'> Delete </Button> </span>
                        </span>


                        <br></br>
                        <p><b> Julia Schmidt, 22nd May 2020</b></p>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
                        <br></br>
                        <a
                            href="https://reactjs.org"
                            target="_blank"
                        >
                            How I managed a garden on my own?
                        </a>

                        <span style={{paddingLeft: '210px'}}>
                            <span>  <Button color='primary'> Edit </Button> </span>
                            <span>  <Button color='primary'> Share </Button> </span>
                            <span>  <Button color='primary'> Delete </Button> </span>
                        </span>

                        <br></br>
                        <p><b> Frederick Boster, 22nd May 2020</b></p>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
                        <br></br>
                        <br></br>
                    </header>

                    </div>
                </div>
            </Page>
        );
    }
};

export default withStyles(styles)(withRouter(BlogsList));