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
import Link from "@material-ui/core/Link";

const styles = (theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: "#f5f5f5",
        height: "300px",
        marginTop: "20px",
        marginLeft: "60px"
    },
    list: {
        width: '850px',
        height: '1500px',
    },
    image: {
        marginBottom: "-10px"
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    box1:{
        width: "49.9%",
        '&:hover': {
            border: '2px solid rgba(0, 0, 0, 0.4)',
            cursor: "pointer"
        }
    },
    boxes: {
        display: 'flex',
        justifyContent: 'space-around',
        marginLeft: "60px"
    },
    header: {
        height: '50px',
        display: "flex",
        justifyContent: "flex-start",
        marginLeft: "75px",
        marginBottom: "-25px",
        fontSize: "20px"
    },

    archiveTitle: {
        height: '50px',
        fontSize: "30px",
        marginBottom: "-25px",
        marginTop: "-5px",
    },
    archive: {
        height: '200px',
    },
    continue: {
        '&:hover': {
            cursor: "pointer"
        }
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
        if (lengthLimit) {
            limit = lengthLimit
        } else {
            limit = 700
        }

        let word = JSON.parse(blog.articleBody).blocks[0].text
        if (!blog) {
            return (" ")
        } else if (word.length >= limit) {
            let result = word.substring(0, limit)
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
                                    <img src="https://i.pinimg.com/originals/a5/7e/c4/a57ec4e46c0c0baa4a8b7bd717354c8a.jpg"  width="900px" height="300px" />
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
                                <Typography variant="body2">
                                    {this.wordLimitCheck(this.state.topPicks[0], 200)}
                                </Typography>
                            </CardContent>
                        </Card>
                        }
                        {this.state.topPicks.length >= 2 &&
                        <Card className={classes.box1}>
                            <CardContent onClick={this.handleDisplay.bind(this, this.state.topPicks[1]._id)}>
                                <Typography color="textPrimary" variant="h4" gutterBottom>
                                    {this.state.topPicks[1].articleTitle}
                                </Typography>
                                <Typography variant="h6">
                                    {this.state.topPicks[1].authorFirstName + " " + this.state.topPicks[1].authorLastName + " "}
                                    {format(new Date(this.state.topPicks[1].createdAt), "MMMM do, yyyy H:mm aa")}
                                </Typography>
                                <Typography variant="body2">
                                    {this.wordLimitCheck(this.state.topPicks[1], 200)}
                                </Typography>
                            </CardContent>
                        </Card>
                        }
                    </div>
                    <br/>
                    <p className={classes.header}><b>
                        <center> From the Firehose</center>
                    </b></p>
                    <hr style={{opacity: "40%",marginLeft: "75px"}}/>
                        <List>
                            {this.state.archive.map((blog, i) => <ListItem style={{marginLeft: "60px"}}>
                                    <ListItemText
                                        primary={
                                   <p className={classes.archiveTitle}>
                                                {blog.articleTitle}
                                            </p>
                                        }
                                        secondary={
                                            <div className={classes.archive}>
                                                <p>{blog.authorFirstName + " " + blog.authorLastName + " - " + format(new Date(blog.createdAt), "MMMM do, yyyy H:mm aa")}</p>
                                                {
                                                    this.wordLimitCheck(blog)
                                                }
                                                <br/>
                                                <Link className={classes.continue}  onClick={this.handleDisplay.bind(this, blog._id)}>  Continue reading... </Link>
                                                <hr style={{marginTop: "40px", border: "1px solid ", opacity: "40%"}} />
                                            </div>
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

export default withStyles(styles)(withRouter(BlogsList))