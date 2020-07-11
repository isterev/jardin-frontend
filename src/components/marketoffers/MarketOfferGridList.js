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
        //backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        overflow: 'auto',
        maxHeight: '70%',
        maxWidth: '50%',
        position: 'absolute',
        top: '29%',
        bottom: '10%',
        left: '25%',
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

        this.handleDisplay = this.handleDisplay.bind(this);
    }

    handleDisplay(id) {
        this.props.history.push('/showOffer/' + id); // TODO
    }

    render() {

        const {classes} = this.props;
        return (
            <Page>
                <div className={classes.root}>
                    <GridList cols={4} spacing={8} cellHeight={180} className={classes.gridList}>
                        {/*<GridListTile key="Subheader" cols={3} style={{height: 'auto'}}>*/}
                        {/*    <ListSubheader component="div">Market Offers</ListSubheader>*/}
                        {/*</GridListTile>*/}

                        {this.props.data.map((marketOffer, i) => <GridListTile key={i}>
                            <img src={'https://material-ui.com/static/images/grid-list/breakfast.jpg'}
                                 alt={marketOffer.title}/>
                            <GridListTileBar
                                title={marketOffer.title}
                                subtitle={<span>by: {marketOffer.creator}</span>}
                                onClick={this.handleDisplay.bind(this, marketOffer._id)}
                            />
                        </GridListTile>)}


                    </GridList>

                </div>
            </Page>
        );
    }
};

export default withStyles(styles)(withRouter(MarketOfferGridList));