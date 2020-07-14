"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import {Formik, Form, Field} from 'formik';
import * as yup from 'yup';

import {Card, Button} from '@material-ui/core';
import {InputLabel, FormHelperText} from '@material-ui/core';

import {TextField} from 'formik-material-ui';


import {AlertMessage} from './util/AlertMessage';
import Page from './Page';


const style = {maxWidth: 500, backgroundColor: "#cede6e"};


class UserSignup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {

        let user = {
            username: values.username,
            password: values.password,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName
        };

        this.props.onSubmit(user);
    }

    // validation with yup
    getSchema() {
        return yup.object().shape({
            username: yup.string()
                .required('Username is required'),
            password: yup.string()
                .required('Password is required'),
            email: yup.string()
                .required('Email is required'),
            firstName: yup.string()
                .required('First name is required'),
            lastName: yup.string()
                .required('Last name is required'),
        })
    };

    render() {
        return (

            <div class="scroll">
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Card style={style}>
                        <Formik
                            initialValues={{
                                username: this.state.username,
                                password: this.state.password,
                                email: this.state.email,
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,

                            }}
                            validationSchema={this.getSchema}
                            onSubmit={this.handleSubmit}
                            render={() => (
                                <Form mode='structured'>
                                    <br/>

                                    <Field
                                        component={TextField}
                                        name="username"
                                        label="Username"
                                    />
                                    <br/>
                                    <Field
                                        component={TextField}
                                        type="password"
                                        label="Password"
                                        name="password"
                                    />
                                    <br/>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        label="User Email"
                                        type="email"
                                    />
                                    <br></br>
                                    <Field
                                        component={TextField}
                                        name="firstName"
                                        label="First Name"
                                    />
                                    <br></br>

                                    <Field
                                        component={TextField}
                                        name="lastName"
                                        label="Last Name"
                                    />

                                    <br></br>


                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={(() => this.form.submit())}
                                    >
                                        Register
                                    </Button>


                                    <Button
                                        type="reset"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Dismiss
                                    </Button>

                                    <AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>

                                </Form>


                            )}
                        />
                    </Card>
                </Page>

            </div>
        )
    }


};

export default withRouter(UserSignup);