"use strict"

import React from 'react'
import {Link, withRouter} from 'react-router-dom'

import {Field, Form, Formik} from 'formik'
import * as yup from 'yup'

import {Button, Card} from '@material-ui/core'

import {TextField} from 'formik-material-ui'
import Page from './Page'
import FormHelperText from "@material-ui/core/FormHelperText"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {createMuiTheme} from "@material-ui/core/styles";
import {withStyles} from "@material-ui/core/styles"
import green from "@material-ui/core/colors/green";
import Header from "./util/Header";
import Footer from "./util/Footer";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2D6042'
        },
        secondary: {
            main: '#A6BC29'
        },
        background: {
            default: "#CFE070"
        }
    },
})
const styles = (theme) => ({
    paper: {
        marginTop: 70,
        //marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        //margin: theme.spacing(1),
        margin: 100,
        backgroundColor: green,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        margin: 100,
        //marginTop: theme.spacing(1),
    },
    submit: {
        margin: 100,
        //margin: theme.spacing(3, 0, 2),
    },
});

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
        const classes = styles();
        return (
            <div>
                <Header/>
                <Card>
                    <Formik
                        initialValues={{
                            username: this.state.username,
                            password: this.state.password
                        }}
                        validationSchema={this.getSchema}
                        onSubmit={this.handleSubmit}
                        render={() => (
                            <form className={classes.form}>
                                <Field
                                    type="TextField"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Field
                                    type="TextField"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>

                        )}
                    />
                </Card>
                <Footer/>
            </div>
        )
    }


}

export default withRouter(UserLogin)