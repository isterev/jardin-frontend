"use strict"

import React from 'react'
import {withStyles} from "@material-ui/styles"
import {withRouter} from "react-router-dom"
import Page from '../Page'
import UserService from "../../services/UserService"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import ListItemText from "@material-ui/core/ListItemText"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import CardContent from "@material-ui/core/CardContent"
import {format} from 'date-fns'

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


})

class BlogsList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }
        if (this.props.data.length >= 2) {
            this.state.topPicks = this.props.data.slice(0, 2)
            this.state.archive = this.props.data.slice(2)
        } else {
            this.state.topPicks = this.props.data
            this.state.archive = []
        }
    }

    handleDisplay(id) {

        this.props.history.push('/blogDetails/' + id)
    }

    wordLimitCheck(blog, lengthLimit) {

        let limit
        if(lengthLimit){
            limit= lengthLimit
        }
        else{
            limit = 700
        }

        let word = JSON.parse(blog.articleBody).blocks[0].text
        if (!blog) {
            return (" ")
        } else if (word.length >= limit) {
            let result = word.substring(0, limit) + " ..."
            return result
        } else {
            return word
        }

    }

    render() {
        const {classes} = this.props
        return (
            <Page>
                <div className={classes.list}>
                    <Card className={classes.root}>
                        <CardContent>
                            <div className={classes.image}>
                                <img src="https://i.ibb.co/SdCDvMy/mainanlage-08-jpg-center-0-584229390681004-0.jpg"
                                     width="900px" height="300px"/>
                                <br/>
                            </div>
                        </CardContent>
                    </Card>
                    <br/>
                    <div className={classes.boxes}>
                        {this.state.topPicks.length >= 1 &&
                        <Card className={classes.box1}>
                            <CardContent onClick={this.handleDisplay.bind(this, this.state.topPicks[0]._id)}>
                                <Typography color="textPrimary" variant="h4" gutterBottom>
                                    {this.state.topPicks[0].articleTitle}
                                </Typography>
                                <Typography variant="h6">
                                    {this.state.topPicks[0].authorFirstName + " " + this.state.topPicks[0].authorLastName + " "}
                                    {format(new Date(this.state.topPicks[0].createdAt), "MMMM do, yyyy H:mm aa")}
                                </Typography>
                                <Typography variant="body2" >
                                    {this.wordLimitCheck(this.state.topPicks[0], 200)}
                                </Typography>
                            </CardContent>
                        </Card>
                        }
                        {this.state.topPicks.length >= 2 &&
                        <Card className={classes.box1}>
                            <CardContent onClick={this.handleDisplay.bind(this, this.state.topPicks[0]._id)}>
                                <Typography color="textPrimary" variant="h4" gutterBottom>
                                    {this.state.topPicks[1].articleTitle}
                                </Typography>
                                <Typography variant="h6">
                                    {this.state.topPicks[1].authorFirstName + " " + this.state.topPicks[1].authorLastName + " "}
                                    {format(new Date(this.state.topPicks[1].createdAt), "MMMM do, yyyy H:mm aa")}
                                </Typography>
                                <Typography variant="body2" >
                                    {this.wordLimitCheck(this.state.topPicks[1], 200)}
                                </Typography>
                            </CardContent>
                        </Card>
                        }
                    </div>
                    <br/>
                    <div>
                        <p style={{fontSize: "20px"}}><b>
                            <center> From the archives</center>
                        </b></p>
                        <hr size={3}></hr>
                        <List className={classes.list}>
                            {this.state.archive.map((blog, i) => <ListItem alignItems="flex-start">
                                    <ListItemText
                                        onClick={this.handleDisplay.bind(this, blog._id)}
                                        primary={
                                            <Typography variant="h6">
                                                {blog.articleTitle}
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                    <span style={{paddingLeft: '400px'}}>
                                  </span>
                                                <Card style={{height: '150px', backgroundColor: "#cede6e"}}>
                                                    <b>{blog.authorFirstName + " " + blog.authorLastName + " - " + format(new Date(blog.createdAt), "MMMM do, yyyy H:mm aa")}</b>
                                                    <br></br>
                                                    {
                                                        this.wordLimitCheck(blog)
                                                    }
                                                </Card>
                                                <br/>
                                            </React.Fragment>
                                        }
                                    />

                                </ListItem>
                            )}
                        </List>
                    </div>
                </div>
            </Page>
        )
    }
}

export default withStyles(styles)(withRouter(BlogsList))