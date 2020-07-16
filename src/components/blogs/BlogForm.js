"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import {Field} from 'formik';
import * as yup from 'yup';
import {Card} from '@material-ui/core';
import Page from '../Page';
import Box from "@material-ui/core/Box";
import AlertDialog from "../util/AlertDialog";
import {withStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import MUIRichTextEditor from "mui-rte";
import {convertToRaw} from "draft-js";

const styles = (theme) => ({
    root: {
        textAlign: 'center'
    },
    card: {
        maxWidth: 850,
        height: 300,
        position: 'absolute',
        top: '20%',
        left: '20%',
        right: '20%',
        backgroundColor: '#cede6e'
    }

});

class BlogForm extends React.Component {

    constructor(props) {
        super(props);

        this.isUpdate = false;
        this.state = {}

        if (this.props.blog != undefined) {
            this.state = {
                articleTitle: props.blog.articleTitle,
                articleBody: props.blog.articleBody
            };
            this.isUpdate = true;

        } else {
            this.state = {
                articleTitle: '',
                articleBody: '',
            };
        }

        this.state.showDialog = false;

        this.handleSave = this.handleSave.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
    }

    handleSave(rteData) {

        if (!this.state.articleTitle || this.state.articleTitle == "") {
            // TODO
        }

        if (!rteData || rteData == "") {
            //TODO
        }

        this.setState(state => ({
            showDialog: true,
            // articleTitle is already set
            articleBody: JSON.stringify(rteData)
        }));
    }

    cancelAction() {

        this.setState(state => ({
            showDialog: false
        }));
    }

    confirmAction() {

        let blog = this.props.blog;
        if (blog == undefined) {
            blog = {};
        }

        blog.articleTitle = this.state.articleTitle;
        blog.articleBody = this.state.articleBody;

        this.props.onSubmit(blog);

        this.setState(state => ({
            showDialog: false
        }));
    }

    // validation with yup
    getSchema() {
        return yup.object().shape({
            articleTitle: yup.string()
                .required('Title is required'),
            articleBody: yup.mixed()
                .required('Content is required')
        })
    };

    render() {

        const {classes} = this.props;

        return (

            <div className="scroll">
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Card className={classes.card}>

                        <p><b>
                            <center> POST A BLOG</center>
                        </b></p>

                        <form className="form">
                            <div className="container">
                                <section>
                                    <Box margin={1}>
                                        <TextField
                                            name="articleTitle"
                                            placeholder="Article Title..."
                                            helperText="Specify a article title"
                                            style={{width: "900px"}}
                                            aria-label="minimum height"
                                            defaultValue={this.state.articleTitle}
                                            onChange=
                                                {
                                                    e => {
                                                        let value = e.target.value
                                                        if (!value || value == "")
                                                            //TODO
                                                            return;

                                                        this.setState({
                                                            articleTitle: e.target.value

                                                        })
                                                    }
                                                }
                                        />
                                        <br/>
                                    </Box>

                                    <Box margin={1} style={{backgroundColor: "#cede6e"}}>
                                        <MUIRichTextEditor
                                            toolbarButtonSize="small"
                                            inlineToolbar
                                            label="Article Content"

                                            name='articleBody'
                                            placeholder="Article Content"
                                            helperText='Write a detailed article body'
                                            //multiline={true}
                                            rows='15'
                                            style={{width: "900px"}}
                                            onChange={value => {
                                                if (!value || value == "")
                                                    //TODO
                                                    //return;
                                                    alert(value)
                                                /*const content = JSON.stringify(
                                                    convertToRaw(value.getCurrentContent())
                                                );
                                                setValue("RTE1", content);*/
                                            }}
                                            defaultValue={this.state.articleBody}
                                            onSave={(rteData) => this.handleSave(rteData)}
                                        />
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

export default withStyles(styles)(withRouter(BlogForm));
