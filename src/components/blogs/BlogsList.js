"use strict";

import React from 'react';
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";

import Page from '../Page'
import UserService from "../../services/UserService";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import Icon from '@material-ui/core/Icon';


const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        //backgroundColor: theme.palette.background.paper,
    },
    list: {
        width: 800,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: '18%',
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

                    <header>
                        <p><b> <center> -----TOP PICKS FOR TODAY ----- </center> </b></p>
                        <br></br>
                        <a
                            href="https://reactjs.org"
                            target="_blank"
                        >
                           Tips and tricks for good harvest
                        </a>
                        <span style={{paddingLeft: '385px'}}>
                            <span>  <Button color='primary' > Edit <EditIcon/>   </Button> </span>
                            <span>  <Button color='primary'> Delete <DeleteIcon/> </Button> </span>
                        </span>
                        <p><b> Peter Miller, 22nd May 2020</b> <br></br>
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                        <br></br>
                        <br></br>
                        <a
                            href="https://reactjs.org"
                            target="_blank"
                        >
                            How to use gardening tools?
                        </a>

                        <span style={{paddingLeft: '415px'}}>
                            <span>  <Button color='primary'> Edit <EditIcon/> </Button> </span>
                            <span>  <Button color='primary'> Delete <DeleteIcon/> </Button> </span>
                        </span>


                        <br></br>
                        <p><b> Julia Schmidt, 22nd May 2020</b> <br></br>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
                        <br></br>
                        <br></br>
                        <a
                            href="https://reactjs.org"
                            target="_blank"
                        >
                            How I managed a garden on my own?
                        </a>

                        <span style={{paddingLeft: '350px'}}>
                            <span>  <Button color='primary' > Edit <EditIcon/>  </Button> </span>
                            <span>  <Button color='primary'> Delete <DeleteIcon/> </Button> </span>
                        </span>

                        <br></br>
                        <p><b> Frederick Boster, 22nd May 2020</b> <br></br>
                         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
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