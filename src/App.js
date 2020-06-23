"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//import {MarketOfferListView} from './views/MarketOfferListView';
//import {MarketOfferDetailView} from './views/MarketOfferDetailView';
//import {MarketOfferFormView} from './views/MarketOfferFormView';
import {UserLoginView} from "./views/UserLoginView";
import {UserSignupView} from "./views/UserSignupView";

import UserService from "./services/UserService";

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#e89eef'
        },
        secondary: {
            main: '#336b87'
        },
    },
});


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Jardin',
            routes: [
                //{component: MarketOfferListView, path: '/', exact: true},
                //{component: MarketOfferDetailView, path: '/show/:id'},
                // {
                //     render: (props) => {
                //         if (UserService.isAuthenticated()) {
                //             return (<MarketOfferFormView {...props} />)
                //         } else {
                //             return (<Redirect to={'/login'}/>)
                //         }
                //     }, path: '/edit/:id'
                // },
                // {
                //     render: (props) => {
                //         if (UserService.isAuthenticated()) {
                //             return (<MarketOfferFormView {...props} />)
                //         } else {
                //             return (<Redirect to={'/login'}/>)
                //         }
                //     }, path: '/addMarketOffer',
                // },
                 {component: UserLoginView, path: '/', exact: true},
                 {component: UserLoginView, path: '/login'},
                 {component: UserSignupView, path: '/register'}
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <span>Hello World!!!</span>
                <div>
                    <Router>
                        <Switch>
                            {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                        </Switch>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

