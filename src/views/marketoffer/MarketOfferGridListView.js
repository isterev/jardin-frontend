"use strict"

import React from 'react'

import MarketOfferGridList from '../../components/marketoffers/MarketOfferGridList'

import MarketOfferService from '../../services/MarketOfferService'


export class MarketOfferGridListView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            data: []
        }
    }

    componentWillMount(){
        this.setState({
            loading: true
        })

        MarketOfferService.getMarketOffers().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            })
        }).catch((e) => {
            console.error(e)
        })
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>)
        }

        return (
            <MarketOfferGridList data={this.state.data}/>
        )
    }
}
