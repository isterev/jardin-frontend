import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import BreadCrumbsComponent from "../../components/consultations/BreadCrumbsComponent";
import {makeStyles} from "@material-ui/core/styles";
import ExpertConsultationService from "../../services/ExpertConsultationService";
import staticExpert from "../../images/consultations/expert-square-2.png"
import Page from "../../components/Page";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(10),
            padding: theme.spacing(5),
            paddingBottom: theme.spacing(2)
        },
        width: "1250px",
    },
    paper: {
        width: "1250px",
        borderRadius: '10px'
    },
    contentContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    image: {
        width: "400px",
        height: "400px",
        borderRadius:"50%"
    },
    sessionText: {
        width: "550px"
    },
}))
function formatDateTimeString(date) {
    let preferred_time_slot = new Date(date)
    let preferred_date = preferred_time_slot.toDateString()
    let preferred_time = preferred_time_slot.toLocaleTimeString()
    preferred_date = preferred_date.substring(4)
    if (preferred_time[2] === ':') {
        preferred_time = preferred_time.substring(2, preferred_time.length-6)
    }
    if (preferred_time[1] === ':') {
        preferred_time = preferred_time.substring(1, preferred_time.length-6)
    }
    if (preferred_time_slot.getHours() < 12) {
        preferred_time = preferred_time_slot.getHours() + preferred_time + ' AM'
    } else if (preferred_time_slot.getHours() === 12) {
        preferred_time = preferred_time_slot.getHours() + preferred_time + ' PM'
    } else {
        preferred_time = preferred_time_slot.getHours() % 12 + preferred_time + ' PM'
    }
    preferred_date = preferred_date + ' ' + preferred_time
    return preferred_date;
}

export default function(props) {
    let requestId = props.match.params.id
    let classes = useStyles()
    let [consultationRequests, setConsultationRequests] = useState([])
    let [expertData, setExpertData] = useState([])
    useEffect(() => {
        async function getConsultationRequests() {
            setConsultationRequests([await ExpertConsultationService.getConsultationSessionsById(requestId)])
        }
        async function getAllExperts() {
            let experts = await ExpertConsultationService.getExperts()
            let expertData = {}
            experts.map(value => {
                expertData[value._id] = value
            })
            setExpertData(experts)
        }
        getConsultationRequests()
        getAllExperts()
    }, [])
    let subject_, expertSummary_, expert_, scheduledFor_
    consultationRequests.map(({subject, consultationSession: {expertSummary, expert, scheduledFor}}) => {
        subject_ = subject
        expertSummary_ = expertSummary
        expert_ = expert
        scheduledFor_ = formatDateTimeString(scheduledFor)
    })
    let expertName_, expertQuote_, expertFullName_
    let imageFileName_ = 'white-background-image.jpg'
    expertData.map(value => {
        if (value._id === expert_) {
            expertFullName_ = value.name
            expertName_ = value.name.split(" ")[0]
            imageFileName_ = value.imageFileName
            expertQuote_ = value.quotation
        }
    })
    return (
        <Page>
            <div className={classes.root}>
            <Paper className={classes.paper}>
                <BreadCrumbsComponent links={[{name: 'Expert Consultation', link: '/expert-consultation/request'},
                    {name: 'Past Consultations', link: '/expert-consultation/my-consultations'},
                    {name: requestId}]}/>
                <div className={classes.contentContainer}>
                    <div style={{textAlign: 'center', width:'400px'}}>
                        <img src={staticExpert} className={classes.image} alt="expert missing..."/>
                        <p>
                            <i>"{expertQuote_}"</i>
                            <br/><br/>- {expertFullName_}, Domain Expert, Team Jardin
                        </p>
                    </div>
                        <div className={classes.sessionText}>
                            <h2>{subject_}</h2>
                            <p style={{marginTop: "-15px"}}>{scheduledFor_}</p>
                            <p><i>{expertSummary_}</i></p>
                            <p>Keep diggin' in!</p>
                            <p>- {expertName_}</p>
                        </div>
                </div>
            </Paper>

        </div>
        </Page>
    )
}
