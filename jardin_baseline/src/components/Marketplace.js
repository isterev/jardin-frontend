import React from 'react';
import Grid from '@material-ui/core/Grid';
import FilterPane from "./FilterPane";

export default function MarketPlace() {
return(
    <Grid container direction="column">
        <Grid item container>
            <Grid item xs={4} sm={2}>
                <FilterPane/>
            </Grid>
            <Grid item xs={8} sm={8} >
               "grids"
            </Grid>
            <Grid item xs={4} sm={2} />
        </Grid>
    </Grid>
);
}