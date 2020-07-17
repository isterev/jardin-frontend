"use strict"

import React from 'react'
import {withRouter} from 'react-router-dom'
import {Card} from '@material-ui/core'
import Page from '../Page'
import Box from "@material-ui/core/Box"
import AlertDialog from "../util/AlertDialog"
import {withStyles} from "@material-ui/styles"
import MUIRichTextEditor from "mui-rte"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const styles = (theme) => ({
    root: {
        textAlign: 'center'
    },
    card: {
        maxWidth: "850px",
        height: "1500px",
        position: 'absolute',
        top: '20%',
        left: '20%',
        right: '20%',
        backgroundColor: '#cede6e',
        marginTop: "40px"
    }

})

class BlogDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            authorId: props.blog.authorId,
            authorFirstName: props.blog.authorFirstName,
            authorLastName: props.blog.authorLastName,
            articleTitle: props.blog.articleTitle,
            articleBody: props.blog.articleBody,
        }
    }

    render() {

        const {classes} = this.props

        return (

            <div className="scroll">
                <Page>
                    <React.Fragment>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={(() => history.go(-1))}
                            style={{marginLeft: "760px", marginTop: "45px"}}

                        >
                            Go Back <KeyboardBackspaceIcon/>
                        </Button>
                    </React.Fragment>
                    <Card className={classes.card}>
                        <div className="container">
                            <section>
                                <Box margin={1}>
                                    <Typography variant="h5">
                                        {this.state.articleTitle}
                                    </Typography>
                                </Box>
                                <Box margin={1} style={{backgroundColor: "#cede6e"}}>
                                    <MUIRichTextEditor
                                        inlineToolbar={false}
                                        toolbar={false}
                                        name='articleBody'
                                        rows='15'
                                        style={{width: "900px"}}
                                        readOnly={true}
                                        defaultValue={this.state.articleBody}
                                    />
                                </Box>
                            </section>
                        </div>
                    </Card>
                </Page>

                <AlertDialog open={this.state.showDialog} dialog={{
                    title: 'Confirm',
                    message: "Do you really want to " + (this.isUpdate ? "update" : "create")
                        + " this blog article?",
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

        )
    }

}

export default withStyles(styles)(withRouter(BlogDetails))
