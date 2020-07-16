"use strict"

import React from 'react'

import GridList from '@material-ui/core/GridList'
import {withStyles} from "@material-ui/styles"
import {withRouter} from "react-router-dom"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import GridListTile from "@material-ui/core/GridListTile"

import Page from '../Page'
import UserService from "../../services/UserService"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        overflow: 'auto',
        maxHeight: '70%',
        width: '800px',
        position: 'absolute',
        top: '29%',
        bottom: '10%',
        left: '25%',
    },
    gridListTile:{
        maxWidth: '25%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
})

class MarketOfferGridList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }

        this.handleDisplay = this.handleDisplay.bind(this)
    }

    handleDisplay(id) {
        this.props.history.push('/showOffer/' + id)
    }

    render() {

        const {classes} = this.props
        return (
            <Page>
                <div className={classes.root}>
                    <GridList cols={4} spacing={8} cellHeight={180} className={classes.gridList}>

                        {this.props.data.map((marketOffer, i) => <GridListTile key={i} className={classes.gridListTile}>
                            <img src={marketOffer.productImage}
                                 alt={marketOffer.title} className={classes.image}/>
                            <GridListTileBar
                                title={marketOffer.title}
                                subtitle={
                                    <div>
                                        <Typography variant="inherit">
                                            {marketOffer.type + ": " + marketOffer.pricePerUnit + " EUR " + marketOffer.denomination}
                                        </Typography>
                                        {/*
                                          // display author name
                                          <Typography variant="inherit">
                                            <Box fontStyle="italic">
                                                by: {marketOffer.creatorFirstName + " " + marketOffer.creatorLastName}
                                            </Box>
                                        </Typography>*/}
                                    </div>
                                }
                                onClick={this.handleDisplay.bind(this, marketOffer._id)}
                            />
                        </GridListTile>)}


                    </GridList>

                </div>
            </Page>
        )
    }
}

export default withStyles(styles)(withRouter(MarketOfferGridList))