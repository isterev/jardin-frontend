"use strict";

import React from 'react';
import { Card, Button, TextField } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';


const style = { maxWidth: 500 };


class UserLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(value) {
        this.setState(Object.assign({}, this.state, {username: value}));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
                <Card style={style} >
                    <form onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Login"
                            id="LoginField"
                            type="text"
                            required={true}
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                            errorText="Login is required"/>
                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            errorText="Password is required"/>

                        <Button id="submit" type="submit"
                                disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' ? true : false}
                                raised primary>Login</Button>
                        <Button id="reset" type="reset" raised secondary>Dismiss</Button>
                        <Link to={'/register'}>Not registered yet?</Link>
                        <AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
            </Page>
        );
    }
};

export default withRouter(UserLogin);