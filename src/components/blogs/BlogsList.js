"use strict";

import React from 'react';
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";

import Page from '../Page'
import UserService from "../../services/UserService";

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


                </div>
            </Page>
        );
    }
};

export default withStyles(styles)(withRouter(BlogsList));