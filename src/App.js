"use strict"

import React, {Fragment} from 'react'
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {MarketOfferGridListView} from "./views/marketoffer/MarketOfferGridListView"
import {MyMarketOfferGridListView} from "./views/marketoffer/MyMarketOfferGridListView"
import {MarketOfferFormView} from "./views/marketoffer/MarketOfferFormView"
import {MarketOfferDetailView} from "./views/marketoffer/MarketOfferDetailView"
import {UserLoginView} from "./views/UserLoginView"
import {UserSignUpView} from "./views/UserSignUpView"
import UserService from "./services/UserService"
import RequestView from "./views/consultations/RequestView";
import RequestListView from "./views/consultations/RequestListView";
import ConsultationView from "./views/consultations/ConsultationDetailsView";
import ConsultationListView from "./views/consultations/ConsultationListView";
import RequestDetailsView from "./views/consultations/RequestDetailsView";
import MyBlogsListView from "./views/blogs/MyBlogsListView";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline"
import {BlogsListView} from "./views/blogs/BlogsListView";
import {BlogFormView} from "./views/blogs/BlogFormView";
import {BlogDetailsView} from "./views/blogs/BlogDetailsView";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2D6042'
        },
        secondary: {
            main: '#A6B829'
        },
        background: {
            default: "#f5f5f5"
        }
    },
})


export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title: 'Jardin',
            routes: [
                {component: BlogsListView, path: '/', exact: true},
                {component: MarketOfferGridListView, path: '/offers'},
                {component: MyMarketOfferGridListView, path: '/myOffers'},
                {component: MarketOfferDetailView, path: '/showOffer/:id'},
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
                {component: BlogsListView, path: '/blogs'},
                {component: MyBlogsListView, path: '/myBlogs'},
                {component: BlogDetailsView, path: '/blogDetails/:id'},

                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return (<BlogFormView {...props} />)
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }, path: '/editBlog/:id'
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return (<BlogFormView {...props} />)
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }, path: '/postBlog',
                },
                {component: UserLoginView, path: '/login'},
                {component: UserSignUpView, path: '/register'},
                { component: RequestView , path: '/expert-consultation', exact: true},
                { component: RequestView , path: '/expert-consultation/request'},
                { component: RequestListView , path: '/expert-consultation/my-requests', exact: true},
                { component: ConsultationListView , path: '/expert-consultation/my-consultations', exact: true},
                { component: RequestDetailsView, path:'/expert-consultation/my-requests/:id'},
                { component: ConsultationView , path: '/expert-consultation/my-consultations/:id'},
                {component: MyBlogsListView, path:'/myBlogs'}
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

