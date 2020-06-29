"use strict";

import React, {Fragment} from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

// TODO
import {BlogsListView} from "./views/blogs/BlogsListView";
import {MyConsultationsListView} from "./views/consultations/MyConsultationsListView";

import {MarketOfferGridListView} from "./views/marketoffer/MarketOfferGridListView";
import {MyMarketOfferGridListView} from "./views/marketoffer/MyMarketOfferGridListView";
import {MarketOfferFormView} from "./views/marketoffer/MarketOfferFormView";
// TODO import {MarketOfferDetailView} from "./views/marketoffer/MarketOfferDetailView";

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
                // TODO {component: MarketOfferDetailView, path: '/show/:id'},
                {
                    render: (props) => {
                            return (<MarketOfferFormView {...props} />)
                    }, path: '/edit/:id'
                },
                {
                    render: (props) => {
                            return (<MarketOfferFormView {...props} />)
                    }, path: '/addOffer',
                },
                {component: BlogsListView, path: '/blogs'},
                {component: MyConsultationsListView, path: '/consult'}
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
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

        );
    }
}

