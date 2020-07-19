"use strict"

import React from 'react'

import Header from './util/Header'
import Footer from './util/Footer'
import Grid from "@material-ui/core/Grid"
import SideLinks from "./util/SideLinks"
import AdsLink from "./util/AdsLink"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import {withRouter} from "react-router-dom"
import FilterPane from "./util/FilterPane"

class Page extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            selectedTab: this.props.location.pathname
        }
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(newValue) {

        this.setState(state => ({
            selectedTab: newValue
        }))

        this.props.history.push(newValue)

    }

    componentDidMount() {
        this.setState({
            title: document.title
        })
    }
    render() {
        let pane
        if (this.state.selectedTab === "/offers" || this.state.selectedTab === "/myOffers") {
            pane = <FilterPane handleFilterChange={this.props.handleFilterChange}/>
        } else {
            pane = <SideLinks/>
        }
        return (
            <section>
                <Header title={this.state.title} selectedTab={this.state.selectedTab}
                        handleTabChange={(value) => this.handleTabChange(value)}/>
                <div style={{paddingTop:'90px', height:'100%'}}>
                    <Grid container direction="column">
                        <Grid item container>
                            <Grid item xs={4} sm={2}>
                                {pane}
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <div>
                                    {/*<Box p={3}>*/}
                                    {/*    <Typography>*/}
                                            {this.props.children}
                                        {/*</Typography>*/}
                                    {/*</Box>*/}
                                </div>
                            </Grid>
                            <Grid item xs={4} sm={2}>
                                <AdsLink/>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Footer/>
            </section>
        )
    }
}

export default withRouter(Page)