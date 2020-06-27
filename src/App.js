"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//import {MarketOfferListView} from './views/MarketOfferListView';
//import {MarketOfferDetailView} from './views/MarketOfferDetailView';
//import {MarketOfferFormView} from './views/MarketOfferFormView';

import {MarketOfferGridListView} from "./views/marketoffer/MarketOfferGridListView";
import {MyMarketOfferGridListView} from "./views/marketoffer/MyMarketOfferGridListView";
import {MarketOfferFormView} from "./views/marketoffer/MarketOfferFormView";

import {UserLoginView} from "./views/UserLoginView";
import {UserSignupView} from "./views/UserSignupView";

import UserService from "./services/UserService";

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";


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
});


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Jardin',
            routes: [
                {component: MarketOfferGridListView, path: '/', exact: true},
                {component: MarketOfferGridListView, path: '/offers'},
                {component: MyMarketOfferGridListView, path: '/myOffers'},
                // {component: MarketOfferDetailView, path: '/show/:id'},
                /*{
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return (<MarketOfferFormView {...props} />)
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }, path: '/edit/:id'
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return (<MarketOfferFormView {...props} />)
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }, path: '/addOffer',
                },*/
                 // {component: UserLoginView, path: '/', exact: true},
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
                <CssBaseline />
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

