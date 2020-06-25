import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemCard from "./ListItemCard";

import marketplaceitems from "./MarketPlaceConstants";

const MarketPlaceContent = () => {
    const getMarketItemCard = marketplaceObj => {
        return (
            <Grid item xs={12} sm={4}>
                <ListItemCard {...marketplaceObj} />
            </Grid>
        );
    };

    return (
        <Grid container spacing={2}>
            {marketplaceitems.map(marketplaceObj => getMarketItemCard(marketplaceObj))}
        </Grid>
    );
};

export default MarketPlaceContent;