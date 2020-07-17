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
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";



const styles = (theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: "#cede6e",
        height: "300px",
        marginTop: "30px"
    },
    list: {
        width: '850px',
        height: '1500px'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    box1: {
        width: "49%",
    },
    boxes: {
        display: 'flex',
        justifyContent: 'space-around',
        height: "auto",
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
                    <div className={classes.list}>
                        <Card className={classes.root}>
                            <CardContent>
                                <div className={classes.image}>
                                    <img src="https://i.ibb.co/SdCDvMy/mainanlage-08-jpg-center-0-584229390681004-0.jpg" width="900px" height="300px"/>
                                <div className={classes.imageText}>
                                    <Typography  color="textSecondary" gutterBottom>
                                        How to manage gardening Tools?
                                    </Typography>
                                    <p> Jul 15, 2020</p>
                                </div>
                                    <br/>
                                    <a href="www.google.com"> </a>
                                </div>
                            </CardContent>
                        </Card>
                        <br/>
                        <div className={classes.boxes}>
                            <Card className={classes.box1}>
                                <CardContent>
                                    <Typography  color="textSecondary" gutterBottom>
                                        How to manage gardening Tools?
                                    </Typography>
                                    <p> Jul 15, 2020</p>
                                    <Typography variant="h5" component="h2">
                                        A shovel is the number one tool in most gardeners' sheds, and it's probably the most versatile. An angled blade makes the shovel ideal for moving piles of soil, sand, and other materials.
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={classes.box1}>
                                <CardContent>
                                    <Typography  color="textSecondary" gutterBottom>
                                        How to manage gardening Tools?
                                    </Typography>
                                    <p> Jul 18, 2020</p>
                                    <Typography variant="h5" component="h2">
                                        A shovel is the number one tool in most gardeners' sheds, and it's probably the most versatile. An angled blade makes the shovel ideal for moving piles of soil, sand, and other materials.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <br/>
                        <br/>
                        <p style={{fontSize: "20px"}}> From the archives </p>
                        <hr size={3}></hr>
                        <List className={classes.list}>
                            {this.props.data.map((blog, i) => <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={blog.title}
                                        secondary={
                                            <React.Fragment>
                                                <Card style={{backgroundColor: "#cede6e", boxShadow: "20px"}}>
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
                </div>
            </Page>
        )
    }
}

export default withStyles(styles)(withRouter(BlogsList));