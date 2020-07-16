"use strict"

import React from 'react'
import {withRouter, Link} from 'react-router-dom'

import {Formik, Form, Field} from 'formik'
import * as yup from 'yup'

import {Card, Button} from '@material-ui/core'

import {TextField} from 'formik-material-ui'


import {AlertMessage} from './util/AlertMessage'
import Page from './Page'


const style = {maxWidth: 500}


class UserLogin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values) {

        let user = {
            username: values.username,
            password: values.password
        }

        this.props.onSubmit(user)
    }

    // validation with yup
    getSchema() {
        return yup.object().shape({
            username: yup.string()
                .required('Username is required'),
            password: yup.string()
                .required('Password is required'),
        })
    }

    render() {
        return (
            <div>
                <Page>
                    <Card style={style}>
                        <Formik
                            initialValues={{
                                username: this.state.username,
                                password: this.state.password
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

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={(() => this.form.submit())}
                                    >
                                        Login
                                    </Button>

                                    <Button
                                        type="reset"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Dismiss
                                    </Button>

                                    <Link to={'/register'}>Not registered yet?</Link>
                                    <AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                                </Form>
                            )}
                        />
                    </Card>
                </Page>

            </div>
        )
    }
}

export default withRouter(UserLogin)