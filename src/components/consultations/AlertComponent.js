import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";


const useStyle = makeStyles(() => ({
    button: {
        opacity: '70%',
        // background: "#b56244",
        color: 'white',
        marginTop: "40px",
        fontWeight: "bold",
        "&:hover": {
            opacity: "80%",
            color: 'white',
        },
        textTransform: 'none',
        fontSize: '15px',
    },
    dialogButton: {
        width: '175px',
    },
    text : {
        color: '#413327',
        fontSize: '15px'
    }
}))
export default function AlertDialog({disabled, style, text}) {
    const classes = useStyle()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} disabled={disabled} className={classes.button} >
                {text}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle><b>{"Request a consultation?"}</b></DialogTitle>
                <DialogContent className={classes.dialog}>
                    <DialogContentText className={classes.text}>
                        <p>By agreeing, you would authorize us to create a consultation request on your behalf and use <b>one</b> of
                        your Consultation Requests from this <b>subscription cycle's quota. </b></p>
                        But, don't worry! You can always cancel within <b>24 hours</b> and we will <b>restore your quota</b>.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus  type="submit" form="requestForm" color="primary" variant="contained" className={[classes.button, classes.dialogButton].join(",")}>
                        Yep, go ahead!
                    </Button>
                    <Button onClick={handleClose} color="secondary" variant="contained" className={[classes.button, classes.dialogButton].join(",")}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
