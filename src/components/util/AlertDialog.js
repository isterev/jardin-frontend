import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withRouter} from "react-router-dom";

class AlertDialog extends React.Component {

    constructor(props) {
        super(props);

        /*
                props, with example usage:

                open = {this.state.showDialog}
                dialog = {
                {
                    title: 'Confirm',
                    message: "Do you really want to " + (this.isUpdate ? "update" : "create")
                        + " this market offer?",
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
                }}
         */
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    //onClose={this.props.dialog.buttons[0].cancelAction}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.props.dialog.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.dialog.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.dialog.buttons[0].cancelAction} color="primary">
                            {this.props.dialog.buttons[0].label}
                        </Button>
                        <Button onClick={this.props.dialog.buttons[1].confirmAction} color="primary" autoFocus>
                            {this.props.dialog.buttons[1].label}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(AlertDialog);