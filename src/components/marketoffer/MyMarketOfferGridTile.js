"use strict";

import React from 'react';
import {confirmAlert} from "react-confirm-alert";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import GridListTile from "@material-ui/core/GridListTile";

export class MyMarketOfferGridTile extends React.Component {

    constructor(props) {
        super(props);
    }

    onDelete(marketOffer) {
        confirmAlert({
            title: 'Confirm',
            message: "Do you really want to delete this market offer?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.onDelete(marketOffer._id)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    render() {

        const {classes} = this.props;

        return (
            /*<TableRow key={this.props.key}>
                <TableColumn><Link to={`/show/${this.props.marketOffer._id}`}><FontIcon>image</FontIcon></Link></TableColumn>
                <TableColumn><SimpleLink to={`/show/${this.props.marketOffer._id}`}>{this.props.marketOffer.title}</SimpleLink></TableColumn>
                {UserService.isAuthenticated() ?
                    <TableColumn><Link to={`/edit/${this.props.marketOffer._id}`}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                }
                {UserService.isAuthenticated() ?
                    <TableColumn><Button onClick={() => this.onDelete(this.props.marketOffer)} icon>delete</Button></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>delete</FontIcon></Link></TableColumn>
                }

            </TableRow>*/

            <GridListTile key={this.props.key}>
                <img src={this.props.img} alt={this.props.title} />
                <GridListTileBar
                    title={this.props.title}
                    subtitle={<span>by: {this.props.creator}</span>}
                    onClick={this.props.history.push(`/show/${this.props.marketOffer._id}`)}
                    actionIcon={
                        <IconButton
                            // edge="end"
                            aria-label={`delete ${this.props.title}`}
                            onClick={this.onDelete(this.props.marketOffer)}
                            color="inherit"
                            className={classes.icon}
                        >
                            <DeleteIcon />  {/* DeleteForever */}
                        </IconButton>

                    }
                />
            </GridListTile>
        );
    }
}