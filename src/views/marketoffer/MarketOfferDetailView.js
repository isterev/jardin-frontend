"use strict"

import React from 'react'
import MarketOfferService from '../../services/MarketOfferService'
import MarketOfferDetail from "../../components/marketoffers/MarketOfferDetail"

export class MarketOfferDetailView extends React.Component {
    constructor(props) {
        super(props)

    }

    componentWillMount(props) {
        this.setState({
            loading: true
        })

        let id = this.props.match.params.id;
        MarketOfferService.getMarketOffer(id).then((marketOffer) => {
            try {
                console.log(marketOffer)
                this.setState({
                    marketOffer: marketOffer,
                    loading: false
                })
            } catch (err) {
                console.error(err)
            }
        })
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>)
        }

        return (
            <MarketOfferDetail marketOffer={this.state.marketOffer} id ={this.props.match.params.id}/>
        )
    }
}
