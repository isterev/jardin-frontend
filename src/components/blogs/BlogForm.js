"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';

import {Button, Card, InputLabel, MenuItem} from '@material-ui/core';

import {TextField, Select} from 'formik-material-ui';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import Page from '../Page';
import Box from "@material-ui/core/Box";
import AlertDialog from "../util/AlertDialog";
import {withStyles} from "@material-ui/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ImageIcon from '@material-ui/icons/Image';
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
    root: {
        textAlign: 'center'
    },
    card: {
        maxWidth: 850,
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
            this.state.values = {
                title: props.blog.title,
                content: props.blog.content,
                //productImage: props.blog.productImage //TODO
            };
            this.isUpdate = true;

        } else {
            this.state.values = {
                title: '',
                content: '',
                //productImage: null //TODO
            };
        }

        this.state.showDialog = false;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
    }

    handleSubmit(values, actions) {

        alert("hello");
        actions.setSubmitting(false);

        this.setState(state => ({
            showDialog: true,
            values: values
        }));
    }

    cancelAction() {

        this.setState(state => ({
            showDialog: false
        }));
    }

    confirmAction() {

        let blog = this.props.blog;
        if(blog == undefined) {
            blog = {};
        }

        blog.title = this.state.values.title;
        blog.content = this.state.values.content;

        this.props.onSubmit(blog);

        this.setState(state => ({
            showDialog: false
        }));
    }

    // validation with yup
    getSchema() {
        return yup.object().shape({
            title: yup.string()
                .required('Title is required'),
            content: yup.string()
                .required('Content is required')
        })
    };

    render() {

        const {classes} = this.props;

        return (

            <div class="scroll">
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Card className={classes.card}>
                        <Formik
                            initialValues={{
                                title: this.state.values.title,
                                content: this.state.values.content,
                            }}
                            validationSchema={this.getSchema}
                            onSubmit={this.handleSubmit}
                            render={() => (
                                <Form mode='structured'>
                                    <p><b> <center> ----- POST A BLOG ----- </center></b></p>
                                    <Box margin={1}>

                                        <Field
                                            component={TextareaAutosize}
                                            name="title"
                                            placeholder = "Article Title"
                                            helperText="Specify a title"
                                            style={{width: "900px"}}
                                            rows='3'
                                            aria-label="minimum height"

                                        />

                                        <br/>

                                    </Box>
                                    <Box margin={1}>

                                        <Field
                                            component={TextareaAutosize}
                                            name='content'
                                            placeholder = "Article Content"
                                            helperText='Write a detailed content'
                                            multiline={true}
                                            rows='15'
                                            style={{width: "900px"}}
                                            // style={{width: "90%", height: "150px"}}
                                        />

                                        <br/>

                                    </Box>
<Box style={{ display: 'flex',
    justifyContent: 'center'}}
margin={1}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            onClick={(() => this.form.submit())}
                                            variant='contained'
                                            color='primary'
                                        >
                                            Submit <PublishIcon/>
                                        </Button>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={(() => this.form.submit())}
                                        variant='contained'
                                        color='primary'
                                    >

                                        Upload an Image <ImageIcon/>
                                    </Button>

                                        <Button
                                            type="reset"
                                            variant="contained"
                                            color="primary"
                                            onClick={(() => history.go(-1))}
                                        >
                                            Cancel <CancelIcon/>
                                        </Button>



                                    </Box>

                                </Form>

                            )}
                        />
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
