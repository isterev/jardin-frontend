"use strict"

import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import {Form, Formik} from 'formik'

import {Button} from '@material-ui/core'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createMuiTheme} from "@material-ui/core/styles";
import Header from "./util/Header";
import Footer from "./util/Footer";
import jardinGirl from "../images/jardin-girl.png"
import FormikTextFieldNoStyle from "./consultations/FormikTextFieldNoStyle";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText";


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
let useStyles = makeStyles(({
    card: {
        width: '25%',
        height: '30%',
        backgroundColor: '#d5e283',
        position: 'fixed',
        borderRadius: '20px',
        bottom: '35%',
        left: '70%',
        padding: '20px',
        textAlign: 'center'
    },
    button: {
        width: '40%',
        backgroundColor: '#367c55',
        color: 'white',
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    },
    jardinGirl: {
        height: '50%',
        position: 'fixed',
        bottom: '20%',
        left: '2%'
    },
    label: {
        fontSize: '18px'
    },
    contents: {
        marginTop: '10%'
    },
    quote: {
        position: 'fixed',
        bottom: '50%',
        left: '25%',
        fontSize: '25px',
        textAlign: 'center',
        opacity: '70%'
    },
    signUp: {
        marginTop: '3%',
        textDecoration: "none",
        color: 'black'
    },
    error: {
        color: '#b56244',
        fontWeight: 'bold'
    }
}))
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required')
})
export default function(props) {
    const classes = useStyles();
    let [selectedTab, setSelectedTab] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    const initialValues = {
        username: username,
        password: password,
    }
    function handleSubmit(values) {
        let user = {
            username: values.username,
            password: values.password,
        }
        props.onSubmit(user)
    }
    let history = useHistory()
    function handleTabChange(value) {
        setSelectedTab(value)
        history.push(value)
    }
    return (
        <div>
            <Header selectedTab={selectedTab}
                    handleTabChange={(value) => handleTabChange(value)}/>
            <img src={jardinGirl} className={classes.jardinGirl} alt={"girl not found..."}/>
            <div className={classes.quote}>
                <p>"Show me your garden and I shall tell you what you are."</p>
                <p>-Alfred Austin</p>
            </div>
            <div className={classes.card}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    >
                    {({errors, touched, isValid, dirty}) => {
                        return (
                            <Form>
                        <div className={classes.contents}>
                            <Grid container spacing={1} direction="column">
                                <Grid item xs={12} container={true} justify="center">
                                    <Grid item xs={3} style={{textAlign:'right'}}>
                                        <label className={classes.label}>
                                            UserName:
                                        </label>
                                    </Grid>
                                    <Grid item xs={5} style={{marginLeft: '10px'}}>
                                        <FormikTextFieldNoStyle name="username" label={"username"}/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{marginLeft: '10px'}} className={classes.error}>
                                    {errors.username && touched.username ? (
                                        <div>{errors.username}</div>
                                    ) : null}
                                </Grid>
                                <Grid item xs={12} container={true} justify="center">
                                    <Grid item xs={3} style={{textAlign:'right'}}>
                                        <label className={classes.label}>
                                            Password:
                                        </label>
                                    </Grid>
                                    <Grid item xs={5} style={{marginLeft: '10px'}}>
                                        <FormikTextFieldNoStyle name="password" label={"password"} isPassword={true}/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{marginLeft: '10px'}} className={classes.error}>
                                    {errors.password && touched.password ? (
                                        <div>{errors.password}</div>
                                    ) : null}
                                </Grid>
                                <Grid item xs={12} style={{marginLeft: '10px'}} className={classes.error}>
                                    {props.error}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" className={classes.button} type="submit">Login</Button>
                                </Grid>
                                <Grid item xs={12} className={classes.signUp}>
                                    Don't have an account? <Link to={"/register"}>Sign up!</Link>
                                </Grid>
                            </Grid>
                        </div>
                        </Form>
                    )}}
                </Formik>
            </div>
            <Footer/>
        </div>
    )
}