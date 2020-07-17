"use strict"

import React from 'react'
import {withRouter} from 'react-router-dom'
import * as yup from 'yup'
import {Card} from '@material-ui/core'
import Page from '../Page'
import Box from "@material-ui/core/Box"
import AlertDialog from "../util/AlertDialog"
import {withStyles} from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import MUIRichTextEditor from "mui-rte"
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import {convertToRaw} from "draft-js";

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

        if (this.props.blog != undefined) {
            this.state = {
                authorId: props.blog.authorId,
                authorFirstName: props.blog.authorFirstName,
                authorLastName: props.blog.authorLastName,
                articleTitle: props.blog.articleTitle,
                articleBody: props.blog.articleBody
            }
            this.isUpdate = true

        } else {
            this.state = {
                articleTitle: '',
                articleBody: '',
            }
        }

        this.state.showDialog = false
        this.state.articleTitleError = false
        this.state.articleBodyError = false

        this.handleSubmit = this.handleSubmit.bind(this)
        this.cancelAction = this.cancelAction.bind(this)
        this.confirmAction = this.confirmAction.bind(this)
    }

    handleSubmit() {

        /*if (!this.state.articleTitle || this.state.articleTitle == "") {
            // TODO
        }*/

        if (!rteData || rteData === "") {
            //TODO
        }

        /*this.setState(state => ({
            showDialog: true,
            // articleTitle is already set
            articleTitle : "trst",
            articleBody: JSON.stringify(rteData)
        }))
*/
        /*let blog = this.props.blog
        if (blog == undefined) {
            blog = {}
        }

        if (this.isUpdate) {
            blog.authorId = this.state.authorId,
            blog.authorFirstName = this.state.authorFirstName,
            blog.authorLastName = this.state.authorLastName
        }

        blog.articleTitle = this.state.articleTitle
        blog.articleBody = rteData

        this.props.onSubmit(blog)
*/

        this.setState(state => ({
            showDialog: true
        }))

        //this.confirmAction()
    }

    cancelAction() {

        this.setState(state => ({
            showDialog: false
        }))
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
        blog.articleBody = JSON.stringify(convertToRaw(this.state.articleBody))

        this.props.onSubmit(blog)

        this.setState(state => ({
            showDialog: false
        }))
    }

    // validation with yup
    getSchema() {
        return yup.object().shape({
            articleTitle: yup.string()
                .required('Title is required'),
            articleBody: yup.mixed()
                .required('Content is required')
        })
    }

    render() {

        const {classes} = this.props

        return (

            <div className="scroll">
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Card className={classes.card}>
                        <form className="form">
                            <React.Fragment>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={(() => this.form.submit())}
                                    style={{marginLeft: "660px", marginTop: "10px"}}
                                >
                                    Submit
                                </Button>
                            </React.Fragment>
                            <React.Fragment>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={(() => history.go(-1))}
                                    style={{marginLeft: "750px", marginTop: "-62px"}}

                                >
                                    Cancel
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
                                            onChange =
                                                {
                                                    e => {
                                                        let value = e.target.value
                                                        if (!value || value === "")
                                                            this.setState({
                                                                articleTitleError: true
                                                            })
                                                        else
                                                            this.setState({
                                                                articleTitleError: false
                                                            })

                                                        this.setState({
                                                            articleTitle: value
                                                        })
                                                    }
                                                }
                                            onBlur={
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
                                            onChange={value => {

                                                /*if (!value || !value.getCurrentContent().hasText()) {
                                                    this.setState({
                                                        articleTitleError: true
                                                    })
                                                }

                                                this.setState(state => ({
                                                    articleBody: value.getCurrentContent()
                                                }))*/

                                            }}
                                            defaultValue={this.state.articleBody}
                                            //onSave={(rteData) => this.handleSave(rteData)}
                                        />
                                        {
                                            this.state.articleBodyError &&
                                            <FormHelperText error={true}>
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
