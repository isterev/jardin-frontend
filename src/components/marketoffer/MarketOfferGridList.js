"use strict";

import React from 'react';

import GridList from '@material-ui/core/GridList';
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";

import Page from '../Page'
import UserService from "../../services/UserService";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class MarketOfferGridList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit() {

        alert("ooo")
        this.props.history.push('/register/'); // TODO

    }

    render() {

        const {classes} = this.props;
        return (
            <Page>
                <div className={classes.root}>
                    <GridList cellHeight={180} className={classes.gridList}>
                        {/*<GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>*/}
                        {/*    <ListSubheader component="div">Market Offers</ListSubheader>*/}
                        {/*</GridListTile>*/}

                        {this.props.data.map((marketOffer, i) => <GridListTile key={i}>
                            <img src={'https://material-ui.com/static/images/grid-list/breakfast.jpg'}
                                 alt={marketOffer.title}/>
                            <GridListTileBar
                                title={marketOffer.title}
                                subtitle={<span>by: {marketOffer.creator}</span>}
                                onClick={this.handleEdit}
                                //onClick={this.props.history.push(`/edit/${this.props.marketOffer._id}`)}
                            />
                        </GridListTile>)}


                    </GridList>

                </div>
            </Page>
        );
    }
};

export default withStyles(styles)(withRouter(MarketOfferGridList));