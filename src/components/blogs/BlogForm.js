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

const styles = (theme) => ({
    root: {
        maxWidth: 500,
        textAlign: 'center'
    },
    card: {
        //maxWidth: 500,
        position: 'absolute',
        top: '20%',
        left: '20%',
        right: '20%',
        //display: 'inline-block',
        //display: 'flex',
        //alignItems: 'center',
        //justifyContent: 'center',
    }
});

class BlogForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {classes} = this.props;

        return (

            <div class="scroll">
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Card className={classes.card}>

                        <div className="textbox">
                            <header>
                                <p><b>Post a Blog </b></p>
                                <TextareaAutosize class="box" aria-label="minimum height" rowsMin={3}
                                                  placeholder="Article Title" style={{width: '835px'}}/> <br></br>
                                <TextareaAutosize class="box" aria-label="minimum height" rowsMin={15}
                                                  placeholder="Article Body" style={{width: '835px'}}/>
                                <br></br>
                                <span style={{paddingLeft: "290px"}}> <Button variant='contained'
                                                                              color='primary'> Submit </Button>  </span>
                                <span> <Button variant='contained' color='primary'> Upload an Image </Button>  </span>
                            </header>
                        </div>
                    </Card>
                </Page>

            </div>

        )
    }
}

export default withStyles(styles)(withRouter(BlogForm));