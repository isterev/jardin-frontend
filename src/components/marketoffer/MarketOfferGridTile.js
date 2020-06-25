"use strict";

import React from 'react';
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";
import UserService from "../../services/UserService";

export class MarketOfferGridTile extends React.Component {

    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit() {

        alert("ooo")

        if (this.props.location.pathname != '/') {
            this.props.history.push('/');
        } else {
            window.location.reload();
        }
    }

    render() {
        const {classes} = this.props;
        return ( // this.props.marketOffer.img
            <GridListTile key={this.props.key}>
                <img src={'https://material-ui.com/static/images/grid-list/breakfast.jpg' } alt={this.props.marketOffer.title}/>
                <GridListTileBar
                    title={this.props.marketOffer.title}
                    subtitle={<span>by: {this.props.marketOffer.creator}</span>}
                    onClick={this.handleEdit}
                    //onClick={this.props.history.push(`/edit/${this.props.marketOffer._id}`)}
                />
            </GridListTile>
        );
    }
}