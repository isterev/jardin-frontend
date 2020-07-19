"use strict"

import React from 'react'

import GridList from '@material-ui/core/GridList'
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import {withStyles} from "@material-ui/styles"
import {Link, withRouter} from "react-router-dom"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

import Page from '../Page'
import UserService from "../../services/UserService"
import Fab from "@material-ui/core/Fab"
import Tooltip from "@material-ui/core/Tooltip"
import AlertDialog from "../util/AlertDialog"
import Typography from "@material-ui/core/Typography"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Button from "@material-ui/core/Button";
import {CustomButton, ColorButton} from "../util/CustomButton";

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
    addButton: {
        position: 'absolute',
        top: '15%',
        right: '32%',
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
            boxShadow: '0 0 0 0.2rem rgba(51,255,115,.5)',
        },*/
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

class MyMarketOfferGridList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            id: undefined,
            data: this.props.data,
            sortAsc: false,
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.cancelAction = this.cancelAction.bind(this)
        this.confirmAction = this.confirmAction.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.compare = this.compare.bind(this)
    }

    handleEdit(id) {

        this.props.history.push('/editOffer/' + id)
    }

    handleDelete(id, e) {

        e.stopPropagation()
        this.setState(state => ({
            showDialog: true,
            id: id
        }))
    }

    cancelAction() {

        this.setState(state => ({
            showDialog: false
        }))
    }

    confirmAction() {

        this.props.onDelete(this.state.id)
        this.setState(state => ({
            showDialog: false
        }))
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
            <Page handleFilterChange={this.handleFilterChange} handleRangeChange={this.handleRangeChange}>
                <div className={classes.root}>
                    <div>
                        {this.state.sortAsc ?
                            <CustomButton disableRipple className={classes.sortButton} onClick={this.handleSort}> Sorted by:
                                Date  < ArrowDropUpIcon fontSize="medium"/> </CustomButton>
                            :
                            <CustomButton disableRipple className={classes.sortButton} onClick={this.handleSort}> Sorted by:
                                Date  < ArrowDropDownIcon fontSize="medium"/> </CustomButton>}
                        <Link to="/addOffer">
                            <Tooltip title="Add" aria-label="add" >
                                <CustomButton className={classes.addButton}>
                                    Add Offer
                                </CustomButton>
                            </Tooltip>
                        </Link>
                        <br/>
                    </div>
                    <GridList cols={4} spacing={35} cellHeight={180} className={classes.gridList}>
                        {this.state.data.map((marketOffer, i) => <GridListTile key={i} className={classes.gridListTile}>
                            <img src={marketOffer.productImage}
                                 alt={marketOffer.title}
                                 onClick={this.handleEdit.bind(this, marketOffer._id)}
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
                                onClick={this.handleEdit.bind(this, marketOffer._id)}

                                actionIcon={
                                    <IconButton
                                        aria-label={`delete ${marketOffer.title}`}
                                        onClick={this.handleDelete.bind(this, marketOffer._id)}
                                        color="inherit"
                                        className={classes.icon}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>)}
                    </GridList>

                    <AlertDialog open={this.state.showDialog} dialog={{
                        title: 'Confirm',
                        message: "Do you really want to delete this market offer?",
                        buttons: [
                            {
                                label: 'No',
                                cancelAction: this.cancelAction
                            },
                            {
                                label: 'Yes',
                                confirmAction: this.confirmAction
                            }
                        ]
                    }}/>
                </div>
            </Page>
        )
    }
}

export default withStyles(styles)(withRouter(MyMarketOfferGridList))