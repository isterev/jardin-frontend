import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import {makeStyles} from "@material-ui/styles";
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
import CancelIcon from '@material-ui/icons/Cancel';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {formatDateTimeString, getEarliestTime} from "../util/ExpertUtils";
import {Button} from "@material-ui/core";
import CancelAlertComponent from "./CancelAlertComponent";

const useStyles = makeStyles(({
    root: {
        width: '800px',
        marginLeft: '100px',
        marginTop: '50px'
    },
    step: {
        marginTop: '38px',
        textAlign: 'center'
    },
    secondStep: {
        marginTop: '78px',
    },
    secondStepWithoutCancellation: {
        marginTop: '52px',
    },
    lastStep: {
        marginTop: '48px',
        marginRight: '20px',
        textAlign: 'center'
    },
    thirdStep: {
        marginTop: '34px',
        marginRight: '20px',
        textAlign: 'center'
    },
    icon: {
        marginTop: '-20px',
        height: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '-15px',
        display: 'block',
    },
    bar: {
        width: '500px'
    },
    button: {
        opacity: '90%',
        background: "#b56244",
        color: 'white',
        fontWeight: "bold",
        "&:hover": {
            opacity: "100%",
            color: 'white',
            background: '#b56244'
        },
        marginTop: '10px',
        textTransform: 'none',
        fontSize: '13px',
        height: '30%',
        width: '60%'
    }
}))

function getEarliestCancellationTime(createdOn) {
    createdOn = new Date(createdOn)
    createdOn.setHours(createdOn.getHours() + 24)
    return formatDateTimeString(createdOn)
}

function isCancellationDisallowed(createdOn, status) {
    return status === 'CANCELLED'
        || status === 'CONDUCTED'
        || status === 'SCHEDULED'
        || new Date(getEarliestCancellationTime(createdOn)) < new Date(Date.now())
}

export default function(props) {
    const classes = useStyles()
        return (
            <div className={classes.root}>
                <ProgressBar
                    className={classes.bar}
                    percent={props.percent}
                    filledBackground="linear-gradient(to right, #f2efed, #cede6e)">
                    <Step>
                        {({ accomplished, index }) => (
                            <div>
                                <div className={[`indexedStep ${accomplished ? "accomplished" : ""}`, classes.step].join(' ')}>
                                    {accomplished ?
                                        <div>
                                            <CheckCircleOutlineSharpIcon className={classes.icon} color='primary'/>
                                            <br/>
                                        </div>
                                        :
                                        <div>
                                            <RadioButtonUncheckedIcon className={classes.icon} color='primary'/>
                                            <br/>
                                        </div>
                                    }
                                    Consultation Requested
                                </div>
                            </div>
                        )}
                    </Step>
                    <Step>
                        {({ accomplished, index }) => (
                            <div>
                                <div className={[`indexedStep ${accomplished ? "accomplished" : ""}`, classes.step,
                                    isCancellationDisallowed(props.createdOn, props.status) ? classes.secondStepWithoutCancellation : classes.secondStep].join(' ')}>
                                    {props.status === 'CANCELLED' ?
                                        <div>
                                            <CancelIcon className={classes.icon} color='secondary'/>
                                            <div style={{marginTop:'15px', fontWeight:'bold'}}>Cancelled</div>
                                            <br/>
                                        </div>
                                        :
                                        accomplished ?
                                            <div>
                                                <CheckCircleOutlineSharpIcon className={classes.icon} color='primary'/>
                                                <br/>
                                                Cancel by <b>{getEarliestCancellationTime(props.createdOn)}</b><br/>
                                            </div>
                                            :
                                            <div>
                                                <RadioButtonUncheckedIcon className={classes.icon} color='primary'/>
                                                <br/>
                                                Cancel by <b>{getEarliestCancellationTime(props.createdOn)}</b><br/>
                                            </div>
                                    }
                                    {
                                        props.status === 'CANCELLED' ?
                                            <div></div>
                                            :
                                        isCancellationDisallowed(props.createdOn, props.status)?
                                            <div style={{color:'white'}}>Filler-content</div>
                                            :
                                            <CancelAlertComponent onSubmit={props.onCancel} text="Cancel Request"/>
                                    }
                                </div>
                            </div>
                        )}
                    </Step>
                    <Step>
                        {({ accomplished, index }) => (
                            <div>
                                <div className={[`indexedStep ${accomplished ? "accomplished" : ""}`, classes.thirdStep].join(' ')}>
                                    {accomplished ?
                                        <div>
                                            <CheckCircleOutlineSharpIcon className={classes.icon} color='primary'/>
                                            <br/>
                                        </div>
                                        :
                                        <div>
                                            <RadioButtonUncheckedIcon className={classes.icon} color='primary'/>
                                            <br/>
                                        </div>
                                    }

                                    {
                                        props.scheduledFor !== undefined && (props.status === 'SCHEDULED' || props.status === 'CONDUCTED')
                                            ?
                                            <div>Scheduled for <b>{props.scheduledFor}</b></div>
                                             :
                                            "Not scheduled yet..."
                                    }
                                </div>
                            </div>
                        )}
                    </Step>
                    <Step>
                        {({ accomplished, index }) => (
                            <div>
                                <div className={[`indexedStep ${accomplished ? "accomplished" : ""}`, classes.lastStep].join(' ')}>
                                    {accomplished ?
                                        <div>
                                            <CheckCircleOutlineSharpIcon className={classes.icon} color='primary'/>
                                            <br/>
                                        </div>
                                        :
                                        <div>
                                            <RadioButtonUncheckedIcon className={classes.icon} color='primary'/>
                                            <br/>
                                        </div>
                                    }
                                    Session Conducted
                                </div>
                            </div>
                        )}
                    </Step>
                </ProgressBar>
            </div>
        )
}