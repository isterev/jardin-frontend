"use strict";

import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

import Page from '../Page'
import UserService from "../../services/UserService";
import AlertDialog from "../util/AlertDialog";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        overflow: 'auto',
        maxHeight: '70%',
        maxWidth: '50%',
        position: 'absolute',
        top: '29%',
        bottom: '10%',
        left: '25%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    add: {
        position: 'absolute',
        top: '18%',
        right: '20%',
    }
});

class MyBlogsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            id: undefined
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
    }

    handleEdit(id) {

        this.props.history.push('/editBlog/' + id); // TODO
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

        const {classes} = this.props
        return (
            <Page>
                <div>
                    <span style={{paddingLeft: '700px'}} className={classes.add}> <Button variant='contained' color='primary'
                                                                                          onClick={() => this.props.history.push("/postBlog")}
                    > Post a blog </Button>  </span>
                </div>

                <div className={classes.root}>
                    <List cols={4} spacing={8} cellHeight={180} className={classes.list}>
                        {this.props.data.map((blog, i) => <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={blog.title}
                                    secondary={
                                        <React.Fragment>
                                            <Card style={{backgroundColor: "#cede6e", boxShadow: "20px"}}>
                                                    <span style={{paddingLeft: '400px'}}>
                            <span>  <Button color='primary'  onClick={this.handleEdit.bind(this, blog._id)}> Edit <EditIcon/>  </Button> </span>
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
            </Page>
        );
    }
};

export default withStyles(styles)(withRouter(MyBlogsList));



