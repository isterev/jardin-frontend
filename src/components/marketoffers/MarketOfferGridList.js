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
import Button from "@material-ui/core/Button";
import {FormHelperText} from "@material-ui/core";
import {Form} from "formik";
import {CustomButton} from "../util/CustomButton";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        overflow: 'auto',
        maxHeight: '70%',
        width: '950px',
        position: 'absolute',
        top: '220px',
    },
    gridListTile: {
        maxWidth: '25%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    sortButton: {
        position: 'absolute',
        top: '15%',
        right: '20%',
        width: '200px',
        backgroundColor: '#2D6042',
        borderColor: '#2D6042',
        '&:hover': {
            backgroundColor: '#2D6042', // '#0069d9'
            borderColor: '#2D6042', //'#0062cc'
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#2D6042', // '#0062cc'
            borderColor: '#2D6042', // '#005cbf'
        },
        color: 'white'
        /*'&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(51,255,155,.5)',
        },*/
    }
})

class MarketOfferGridList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            data: this.props.data,
            sortAsc: false,
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
        if (this.state.sortAsc) {
            result = result.sort(this.compare)
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
            sortAsc: !this.state.sortAsc,
            data: result,
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Page handleFilterChange={this.handleFilterChange}>
                <div className={classes.root}>
                    <div>
                        {this.state.sortAsc ?
                            <CustomButton className={classes.sortButton} onClick={this.handleSort}> Sorted by:
                                Date < ArrowDropUpIcon fontSize="medium"/> </CustomButton>
                            :
                            <CustomButton className={classes.sortButton} onClick={this.handleSort}> Sorted by:
                                Date < ArrowDropDownIcon fontSize="medium"/> </CustomButton>}
                    </div>
                    <GridList cols={4} spacing={35} cellHeight={180} className={classes.gridList}>
                        {this.state.data.map((marketOffer, i) => <GridListTile key={i} className={classes.gridListTile}>
                            <img src={marketOffer.productImage}
                                 alt={marketOffer.title} className={classes.image}
                                 onClick={this.handleDisplay.bind(this, marketOffer._id)}
                            />
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