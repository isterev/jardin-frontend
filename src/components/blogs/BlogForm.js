"use strict"

import React from 'react'
import {withRouter} from 'react-router-dom'
import {Card} from '@material-ui/core'
import Page from '../Page'
import Box from "@material-ui/core/Box"
import AlertDialog from "../util/AlertDialog"
import {withStyles} from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import MUIRichTextEditor from "mui-rte"
import Button from "@material-ui/core/Button"
import FormHelperText from "@material-ui/core/FormHelperText"
import {convertToRaw} from "draft-js"
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = (theme) => ({
    root: {
        textAlign: 'center'
    },
    card: {
        maxWidth: "850px",
        height: "1000px",
        position: 'absolute',
        top: '20%',
        left: '20%',
        right: '20%',
        backgroundColor: '#cede6e'
    }

})

class BlogForm extends React.Component {

    constructor(props) {
        super(props)

        this.isUpdate = false
        this.state = {}

        if (this.props.blog !== undefined) {
            this.state = {
                authorId: props.blog.authorId,
                authorFirstName: props.blog.authorFirstName,
                authorLastName: props.blog.authorLastName,
                articleTitle: props.blog.articleTitle,
                articleBody: props.blog.articleBody,
            }
            this.isUpdate = true

        } else {
            this.state = {
                articleTitle: '',
                articleBody: '{"blocks":[],"entityMap":{}}',
            }
        }

        this.state.articleEditorState = null
        this.state.articleTitleError = false
        this.state.articleBodyError = false

        this.state.showDialog = false

        this.handleSubmit = this.handleSubmit.bind(this)
        this.cancelAction = this.cancelAction.bind(this)
        this.confirmAction = this.confirmAction.bind(this)
    }

    handleSubmit(event) {

        event.preventDefault()

        let error = false
        let value = this.state.articleTitle
        if (!value || value === "") {

            this.setState({
                articleTitleError: true
            })
            error = true
        }

        if (!this.state.articleEditorState.hasText()) {
            this.setState({
                articleBodyError: true
            })
            error = true
        }

        if (error)
            return

        this.setState({
            showDialog: true
        })
    }

    cancelAction() {

        this.setState({
            showDialog: false
        })
    }

    confirmAction() {

        let blog = this.props.blog
        if (this.isUpdate) {
            blog.authorId = this.state.authorId
            blog.authorFirstName = this.state.authorFirstName
            blog.authorLastName = this.state.authorLastName
        } else {
            blog = {}
        }

        blog.articleTitle = this.state.articleTitle
        blog.articleBody = JSON.stringify(convertToRaw(this.state.articleEditorState))

        this.props.onSubmit(blog)

        this.setState({
            showDialog: false
        })
    }

    render() {

        const {classes} = this.props

        return (

            <div className="scroll">
                <Page>
                    <Card className={classes.card}>
                        <form onSubmit={this.handleSubmit}>
                            <React.Fragment>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    style={{marginLeft: "620px", marginTop: "10px"}}

                                >
                                    Submit <PublishIcon/>
                                </Button>
                            </React.Fragment>
                            <React.Fragment>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={(() => history.go(-1))}
                                    style={{marginLeft: "735px", marginTop: "-62px"}}

                                >
                                    Cancel <CancelIcon/>
                                </Button>
                            </React.Fragment>
                            <div className="container">
                                <section>
                                    <Box margin={1}>
                                        <TextField
                                            name="articleTitle"
                                            placeholder="Article Title..."
                                            style={{width: "900px"}}
                                            defaultValue={this.state.articleTitle}
                                            onChange=
                                                {
                                                    e => {
                                                        let value = e.target.value
                                                        if (value && value !== "")
                                                            this.setState({
                                                                articleTitleError: false
                                                            })

                                                        this.setState({
                                                            articleTitle: value
                                                        })
                                                    }
                                                }
                                            onBlur=
                                                {
                                                    () => {
                                                        let value = this.state.articleTitle
                                                        if (!value || value === "")
                                                            this.setState({
                                                                articleTitleError: true
                                                            })
                                                        else
                                                            this.setState({
                                                                articleTitleError: false
                                                            })
                                                    }
                                                }
                                        />
                                        {
                                            this.state.articleTitleError &&
                                            <FormHelperText error={true}>
                                                {'Title is required'}
                                            </FormHelperText>
                                        }
                                        <br/>
                                    </Box>

                                    <Box margin={1} style={{backgroundColor: "#cede6e"}}>
                                        <MUIRichTextEditor
                                            inlineToolbar
                                            label="Article Content..."
                                            name='articleBody'
                                            placeholder="Article Content"
                                            rows='15'
                                            style={{width: "900px"}}
                                            controls={["title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "media", "numberList", "bulletList", "quote", "code", "clear"]}
                                            onChange=
                                                {
                                                    value => {

                                                        if (this.state !== undefined) {
                                                            let content = value.getCurrentContent()
                                                            if (content.hasText()) {
                                                                this.setState({
                                                                    articleBodyError: false,
                                                                })
                                                            }

                                                            this.setState({
                                                                articleEditorState: content
                                                            })
                                                        }
                                                    }}
                                            onBlur=
                                                {
                                                    () => {
                                                        if (!this.state.articleEditorState.hasText()) {
                                                            this.setState({
                                                                articleBodyError: true,
                                                            })
                                                        } else {
                                                            this.setState({
                                                                articleBodyError: false,
                                                            })
                                                        }

                                                    }}
                                            defaultValue={this.state.articleBody}
                                        />
                                        {
                                            this.state.articleBodyError &&
                                            <FormHelperText error={true} style={{position: 'relative', top: '30px'}}>
                                                {'Content is required'}
                                            </FormHelperText>
                                        }
                                    </Box>
                                </section>
                            </div>


                        </form>
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

export default withStyles(styles)(withRouter(BlogForm))
