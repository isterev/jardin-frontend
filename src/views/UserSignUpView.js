"use strict"

import React from 'react'

import UserSignUp from '../components/UserSignUp'

import UserService from '../services/UserService'


export class UserSignUpView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    async signup(user) {
        try {
            let ret = await UserService.register(user.username, user.password, user.email, user.firstName, user.lastName)
            this.props.history.push('/')
        } catch(err) {
            console.error(err)
            this.setState({
                error: err
            })
        }
    }

    render() {
        return (
            <UserSignUp onSubmit={(user) => this.signup(user)} error={this.state.error}/>
        )
    }
}