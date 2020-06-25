"use strict";

import React from 'react';

import {MyMarketOfferGridTile} from './MyMarketOfferGridTile';
import Page from '../Page'
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';


const useStyles = makeStyles((theme) => ({
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
}));

export default function MyMarketOfferGridList(data, onDelete) {
    const classes = useStyles();

    return (
        <Page>
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    {/*<GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>*/}
                    {/*    <ListSubheader component="div">Market Offers</ListSubheader>*/}
                    {/*</GridListTile>*/}

                    {data.map((marketOffer, i) => <MyMarketOfferGridTile key={i} marketOffer={marketOffer} onDelete={(id) => onDelete(id)} />)}

                </GridList>

            </div>
        </Page>
    );
}
