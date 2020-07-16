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
import Card from "@material-ui/core/Card";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AlertDialog from "../util/AlertDialog";


const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        //backgroundColor: theme.palette.background.paper,
    },
    list: {
        width: '850px',
        height: 'auto',
        top: '5%'
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

    handleDisplay(id) {

        this.props.history.push('/showBlog/' + id); // TODO
    }

    handleDelete(id, e) {

        e.stopPropagation();
        this.setState(state => ({
            showDialog: true,
            id: id
        }));
    }
    cancelAction() {

        this.setState(state => ({
            showDialog: false
        }));
    }

    confirmAction() {

        this.props.onDelete(this.state.id)
        this.setState(state => ({
            showDialog: false
        }));
    }

    render() {

        const {classes} = this.props;
        return (
            <Page>
                <div className={classes.root}>

                    <div className={classes.list}>
                        <Typography variant={"h6"}>
                            <p><b>
                                <center> -----TOP PICKS FOR TODAY -----</center>
                            </b></p>
                        </Typography>
                        <List cols={4} spacing={8} cellHeight={180} className={classes.list}>
                            {this.props.data.map((blog, i) => <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={blog.title}
                                        secondary={
                                            <React.Fragment>
                                                <Card style={{backgroundColor: "#cede6e", boxShadow: "20px"}}>
                                                    <span style={{paddingLeft: '400px'}}>
                           <span>  <Button color='primary'  onClick={this.handleDisplay.bind(this, blog._id)}> Edit <EditIcon/>  </Button> </span>
                            <span>  <Button color='primary'  onClick={this.handleDelete.bind(this, blog._id)}> Delete <DeleteIcon/> </Button> </span>
                        </span>

                                                    <br></br>
                                                    <p>
                                                        <b>{blog.authorFirstName + " " + blog.authorLastName + ", " + blog.createdAt}</b>
                                                        <br></br>
                                                        {blog.content}
                                                    </p>
                                                    <br></br>
                                                    <br></br>
                                                </Card>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            )}
                        </List>
                        <AlertDialog open={this.state.showDialog} dialog={{
                            title: 'Confirm',
                            message: "Do you really want to delete this blog?",
                            buttons: [
                                {
                                    label: 'No',
                                    cancelAction: this.cancelAction
                                },
                                {
                                    label: 'Yes',
                                    confirmAction: this.confirmAction
                                }
                            ]
                        }}/>
                    </div>
                </div>
            </Page>
        )
    }
}

export default withStyles(styles)(withRouter(BlogsList));