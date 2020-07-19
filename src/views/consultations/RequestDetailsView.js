import React, {useEffect, useState} from "react";
import Page from "../../components/Page";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import BreadCrumbsComponent from "../../components/consultations/BreadCrumbsComponent";
import ExpertConsultationService from "../../services/ExpertConsultationService";
import staticImage from "../../images/consultations/1.png";
import RequestProgressBar from "../../components/consultations/RequestProgressBar"
import {formatDateTimeString} from "../../components/util/ExpertUtils";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(10),
            padding: theme.spacing(5),
            paddingBottom: theme.spacing(2)
        },
        width: "100%",
    },
    paper: {
        width: "100%",
        borderRadius: '10px',
        paddingBottom: '100px'
    },
    contentContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    image: {
        width: "100%",
    },
    sessionText: {
        width: "55%"
    },
}))

export default function (props) {
    const classes = useStyles()
    let requestId = props.match.params.id
    const [requestData, setRequestData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getRequests() {
            return await ExpertConsultationService.getConsultationRequestsById(requestId)
        }
        getRequests().then((requestData) => {
            setRequestData(requestData)
            setLoading(false)
        })
    }, [])
    let history = useHistory()
    async function onCancel() {
        requestData['status'] = 'CANCELLED'
        await ExpertConsultationService.updateConsultationRequest(requestData)
        history.push({
            pathname: "/expert-consultation/my-requests/" + requestId
        })
    }
    return(
        <Page>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <BreadCrumbsComponent links={[{name: 'Expert Consultation', link: '/expert-consultation/request'},
                        {name: 'Past Requests', link: '/expert-consultation/my-requests'},
                        {name: requestId}]}/>
                        <div>
                            {
                                loading ? (<div/>):
                                    (
                                        <div className={classes.contentContainer}>
                                            <div style={{textAlign: 'center', width:'400px'}}>
                                                <img src={staticImage} className={classes.image} alt="image missing..."/>
                                            </div>
                                            <div className={classes.sessionText}>
                                                <h2 style={{marginTop: "-7px"}}>{requestData['subject']}</h2>
                                                <p style={{marginTop: "-15px"}}><b>Requested On:</b> {formatDateTimeString(requestData['createdOn'])}</p>
                                                <p style={{marginTop: "-15px"}}><b>Category:</b> {requestData['category']}</p>
                                                <p style={{marginTop: "-15px"}}>{parsePreferredDates()}</p>
                                                <p style={{marginTop: "-5px"}}>{requestData['description']}</p>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    <RequestProgressBar
                        percent={calculateProgress()}
                        createdOn={requestData['createdOn']}
                        onCancel={onCancel}
                        status={requestData['status']}
                        scheduledFor={processScheduledFor()}
                    />
                </Paper>
            </div>
        </Page>
    )

    function processScheduledFor() {
        switch (requestData['scheduledFor']) {
            case 'FIRST_PREF':
                return formatDateTimeString(requestData['firstPreference'])
            case 'SECOND_PREF':
                return formatDateTimeString(requestData['secondPreference'])
            case 'THIRD_PREF':
                return formatDateTimeString(requestData['thirdPreference'])
            default:
                return undefined
        }
    }

    function getEarliestCancellationTime(createdOn) {
        createdOn = new Date(createdOn)
        createdOn.setHours(createdOn.getHours() + 24)
        return createdOn
    }
    function calculateProgress() {
        switch (requestData['status']) {
            case 'CREATED':
                if (getEarliestCancellationTime(requestData['createdOn']) > new Date(Date.now())) {
                    return "20"
                }
                return "50"
            case 'CANCELLED':
                return "33.34"
            case 'SCHEDULED':
                return "70"
            case 'CONDUCTED':
                return "100"
            default:
                return "0"
        }
    }
    function parsePreferredDates() {
        return formatDateTimeString(requestData['firstPreference']) + " | " +
            formatDateTimeString(requestData['secondPreference']) + " | " +
            formatDateTimeString(requestData['thirdPreference'])
    }
}