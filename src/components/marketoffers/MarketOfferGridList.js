"use strict";

import React from 'react';

import GridList from '@material-ui/core/GridList';
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import GridListTile from "@material-ui/core/GridListTile";

import Page from '../Page'
import UserService from "../../services/UserService";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
        width: '800px',//'50%',
        position: 'absolute',
        top: '29%',
        bottom: '10%',
        left: '25%',
    },
    gridListTile:{
        //maxHeight: '250px',
        maxWidth: '25%',//'50%'
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

                        {this.props.data.map((marketOffer, i) => <GridListTile key={i} className={classes.gridListTile}>
                            <img src={marketOffer.productImage}
                                 alt={marketOffer.title} className={classes.image}/>
                            <GridListTileBar
                                title={marketOffer.title}
                                subtitle={
                                    <div>
                                        <Typography variant="inherit">
                                            <Box fontStyle="italic">
                                                  by: {marketOffer.creatorFirstName + " " + marketOffer.creatorLastName}
                                            </Box>
                                        </Typography>
                                        <br/>
                                        <Typography variant="inherit">
                                            {marketOffer.type + ": " + marketOffer.pricePerUnit + " EUR " + marketOffer.denomination}
                                        </Typography>
                                    </div>
                                }
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