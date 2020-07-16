"use strict"

import React, {Fragment} from 'react'
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import {MarketOfferGridListView} from "./views/marketoffer/MarketOfferGridListView"
import {MyMarketOfferGridListView} from "./views/marketoffer/MyMarketOfferGridListView"
import {MarketOfferFormView} from "./views/marketoffer/MarketOfferFormView"

import {UserLoginView} from "./views/UserLoginView"
import {UserSignUpView} from "./views/UserSignUpView"

import UserService from "./services/UserService"

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline"


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


export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title: 'Jardin',
            routes: [
                {component: MarketOfferGridListView, path: '/', exact: true},
                {component: MarketOfferGridListView, path: '/offers'},
                {component: MyMarketOfferGridListView, path: '/myOffers'},
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return (<MarketOfferFormView {...props} />)
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }, path: '/editOffer/:id'
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return (<MarketOfferFormView {...props} />)
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }, path: '/addOffer',
                },
                {component: UserLoginView, path: '/login'},
                {component: UserSignUpView, path: '/register'}
            ]
        }
    }

    componentDidMount() {
        document.title = this.state.title
    }

    render() {
        return (

            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <Router>
                    <div className="App">
                        <Route
                            path="/"
                            render={({location}) => (
                                <Fragment>
                                    <Switch>
                                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                                    </Switch>
                                </Fragment>
                            )}
                        />
                    </div>
                </Router>
            </MuiThemeProvider>

        )
    }
}

