"use strict";

import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {withStyles} from "@material-ui/styles";
import {withRouter, Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Page from '../Page'
import UserService from "../../services/UserService";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AlertDialog from "../util/AlertDialog";

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
    add: {
        position: 'absolute',
        top: '18%',
        right: '20%',
    }
});

class MyMarketOfferGridList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
            id: undefined
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
    }

    handleEdit(id) {

        this.props.history.push('/edit/' + id); // TODO
    }

    handleDelete(id, e) {

        e.stopPropagation();
        this.setState(state => ({
            showDialog: true,
            id: id
        }));
    }

    cancelAction() {

        this.setState(state => ({
            showDialog: false
        }));
    }

    confirmAction() {

        this.props.onDelete(this.state.id)
        this.setState(state => ({
            showDialog: false
        }));
    }

    render() {

        const {classes} = this.props;
        return (
            <Page>
                <div>
                    <Link to="/addOffer">
                        <Tooltip title="Add" aria-label="add" className={classes.add} >
                            <Fab color="secondary">
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </Link>
                    <br/>
                </div>

                <div className={classes.root}>
                    <GridList cols={4} spacing={8} cellHeight={180} className={classes.gridList}>

                        {this.props.data.map((marketOffer, i) => <GridListTile key={i}>
                            <img src={'https://material-ui.com/static/images/grid-list/breakfast.jpg'}
                                 alt={marketOffer.title}/>
                            <GridListTileBar
                                title={marketOffer.title}
                                subtitle={<span>by: {marketOffer.creator}</span>}
                                onClick={this.handleEdit.bind(this, marketOffer._id)}
                                //onClick={this.props.history.push(`/edit/${this.props.marketOffer._id}`)}

                                actionIcon={
                                    <IconButton
                                        // edge="end"
                                        aria-label={`delete ${marketOffer.title}`}
                                        onClick={this.handleDelete.bind(this, marketOffer._id)}
                                        color="inherit"
                                        className={classes.icon}
                                    >
                                        <DeleteIcon/> {/* DeleteForever */}
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
        );
    }
};

export default withStyles(styles)(withRouter(MyMarketOfferGridList));