"use strict"

import React from 'react'

import GridList from '@material-ui/core/GridList'
import {withStyles} from "@material-ui/styles"
import {withRouter} from "react-router-dom"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import GridListTile from "@material-ui/core/GridListTile"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import Page from '../Page'
import UserService from "../../services/UserService"
import Typography from "@material-ui/core/Typography"

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
        top: '35%',
        bottom: '10%',
    },
    gridListTile: {
        maxWidth: '25%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    sortButton: {
        //position: 'absolute',
        top: '18%',
        right: '50%',
    }
})

class MarketOfferGridList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            data: this.props.data,
            sortAsc: true,
        }

        this.handleDisplay = this.handleDisplay.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.compare = this.compare.bind(this)
    }

    handleDisplay(id) {
        this.props.history.push('/showOffer/' + id)
    }

    handleFilterChange(values, priceValue) {
        const offers = this.props.data
        let result = offers.filter(offer => values[offer.type] && values[offer.category] && offer.pricePerUnit >= priceValue[0] && offer.pricePerUnit <= priceValue[1])
        if (!this.state.sortAsc) {
            result = result.sort(this.compare(a, b))
        }
        this.setState({
            data: result
        })
    }

    compare(a, b) {
        if (a.createdAt > b.createdAt) {
            return this.state.sortAsc ? -1 : 1
        }
        if (a.createdAt < b.createdAt) {
            return this.state.sortAsc ? 1 : -1
        }
        return 0
    }

    handleSort() {
        const offers = this.state.data
        const result = offers.sort(this.compare)
        this.setState({
            data: result,
            sortAsc: !this.state.sortAsc
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Page handleFilterChange={this.handleFilterChange}>
                <div className={classes.root}>
                    <GridList cols={4} spacing={8} cellHeight={180} className={classes.gridList}>
                        <div >
                            <button className={classes.sortButton} onClick={this.handleSort}>Sort by: Date
                                {this.state.sortAsc ?
                                    <ArrowDropDownIcon fontSize="medium"/> :
                                    <ArrowDropUpIcon fontSize="medium"/>}
                            </button>
                        </div>
                        {this.state.data.map((marketOffer, i) => <GridListTile key={i} className={classes.gridListTile}>
                            <img src={marketOffer.productImage}
                                 alt={marketOffer.title} className={classes.image}/>
                            <GridListTileBar
                                title={marketOffer.title}
                                subtitle={
                                    <div>
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
        )
    }
}

export default withStyles(styles)(withRouter(MarketOfferGridList))