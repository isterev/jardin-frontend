"use strict"

import React from 'react'
import {withStyles} from "@material-ui/styles"
import {withRouter} from "react-router-dom"
import DeleteIcon from '@material-ui/icons/Delete'
import Page from '../Page'
import UserService from "../../services/UserService"
import AlertDialog from "../util/AlertDialog"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Card from "@material-ui/core/Card"
import EditIcon from "@material-ui/icons/Edit"

const styles = (theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    page: {
        overflow: 'auto',
        maxHeight: '70%',
        maxWidth: '90%',
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
})

class MyBlogsList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            id: undefined
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.cancelAction = this.cancelAction.bind(this)
        this.confirmAction = this.confirmAction.bind(this)
    }

    handleEdit(id) {

        this.props.history.push('/editBlog/' + id)
    }

    handleDelete(id, e) {

        e.stopPropagation()
        this.setState(state => ({
            showDialog: true,
            id: id
        }))
    }

    cancelAction() {

        this.setState(state => ({
            showDialog: false
        }))
    }

    confirmAction() {

        this.props.onDelete(this.state.id)
        this.setState(state => ({
            showDialog: false
        }))
    }

    render() {

        const {classes} = this.props
        return (
            <Page>
                <div>

                </div>

                <div className={classes.root}>
                    <List className={classes.list} style={{paddingTop: '80px'}}>
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
                        message: "Are you sure you want to delete this blog?",
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
        )
    }
}

export default withStyles(styles)(withRouter(MyBlogsList))



