"use strict";

import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {withStyles} from "@material-ui/styles";
import {withRouter, Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Page from '../Page'
import UserService from "../../services/UserService";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AlertDialog from "../util/AlertDialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        //backgroundColor: theme.palette.background.paper,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    add: {
        position: 'absolute',
        top: '18%',
        right: '20%',
    },
    list: {
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
        width: 700,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: '25%',
    },
    inline: {
        display: 'inline',
    }
});

class MyBlogGridList extends React.Component {

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

        this.props.history.push('/edit/' + id); // TODO
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
                <div>
                    <Link to="/postBlog">
                        <Tooltip title="Post a Blog" aria-label="Post" className={classes.add}>
                            <Fab color="secondary">
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </Link>
                    <br/>
                </div>
                <List className={classes.list}>
                    {this.props.data.map((blog, i) =>
                        <ListItemText alignItems="flex-start">


                        <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                        <React.Fragment>
                        <span style={{paddingLeft: '250px'}}>
                        <span>  <Button color='primary' onClick={this.handleEdit.bind(this, blog._id)}>
                        Edit  </Button> </span>
                        <span>   <IconButton
                        // edge="end"
                        aria-label={`delete ${blog.title}`}
                        onClick={this.handleDelete.bind(this, blog._id)}
                        color="inherit"
                        className={classes.icon}
                        >
                        <DeleteIcon/> {/!* DeleteForever *!/}
                        </IconButton> </span>

                        </span>

                        <p><b>  {blog.author}, {blog.creation_date}</b></p>
                        <p> {blog.description} </p>
                        <br></br>
                        <a
                        href="https://reactjs.org"
                        target="_blank"
                        >
                        {blog.title}
                        </a>
                        </React.Fragment>
                    }
                        />
                    }
                            <Divider variant="inset" component="li" />)

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

export default withStyles(styles)(withRouter(MyBlogGridList));