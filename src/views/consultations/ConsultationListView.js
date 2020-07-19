import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import BreadCrumbsComponent from "../../components/consultations/BreadCrumbsComponent";
import SimpleSelect from "../../components/consultations/SimpleSelect";
import SearchComponent from "../../components/consultations/SearchComponent";
import ConsultationSessionComponent from "../../components/consultations/ConsultationSessionComponent";
import ExpertConsultationService from "../../services/ExpertConsultationService";
import RegretComponent from "../../components/consultations/RegretComponent";
import Page from "../../components/Page";
import UserService from "../../services/UserService";
import {filterByYear, filterForLastNDays, formatDateTimeString} from "../../components/util/ExpertUtils";

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
        borderRadius: '10px'
    },
    durationFilter: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: "Arial",
        fontSize: "16px",
        marginBottom: "20px",
    }
}))

export default function() {
    const menuItems = ["last 30 days", "last 6 months", "2020", "2019", "2018", "2017", "2016"]
    const classes = useStyles()

    let [consultationData, setConsultationData] = useState([]);
    let [originalConsultationData, setOriginalConsultationData] = useState([]);
    let [expertData, setExpertData] = useState([])
    let [durationFilter, setDurationFilter] = useState("last 30 days")
    let [searchFilter, setSearchFilter] = useState("")

    useEffect(() => {
        async function getAllConsultations() {
            let currentUser = await UserService.getCurrentUser()
            return await ExpertConsultationService.getConsultationSessionsFor(currentUser['id'])
        }
        async function getAllExperts() {
            return await ExpertConsultationService.getExperts()
        }
        getAllConsultations().then((allConsultationData) => {
            setOriginalConsultationData(allConsultationData)
            let durationFilteredConsultationData = filterForLastNDays(allConsultationData, 30)
            setConsultationData(durationFilteredConsultationData)
        })
        getAllExperts().then((expertData) => {
            experts.map(value => {
                expertData[value._id] = value
            })
            setExpertData(experts)
        })
    }, [])

    useEffect(() => {
        processFilters(durationFilter, searchFilter)
    }, [durationFilter, searchFilter])

    let consultationsMade = consultationData.length
    function handleDurationChange(e) {
        setDurationFilter(e.target.value)
    }
    function handleSearchChange(e) {
        setSearchFilter(e.target.value)
    }
    function processFilters(durationValue, searchString) {
        let durationType = menuItems.indexOf(durationValue)
        let durationFilteredData = originalConsultationData
        switch (durationType) {
            case -1:
                durationFilteredData = filterForLastNDays(originalConsultationData, 30)
                break
            case 0:
                durationFilteredData = filterForLastNDays(originalConsultationData, 30)
                break
            case 1:
                durationFilteredData = filterForLastNDays(originalConsultationData, 180)
                break
            default:
                durationFilteredData = filterByYear(originalConsultationData, durationValue)
                break
        }
        let searchFilteredData = []
        durationFilteredData.map((dataItem, index) => {
            if (dataItem.subject.toLowerCase().includes(searchString) ||
                dataItem._id.toLowerCase().includes(searchString) ||
                dataItem.consultationSession.expertSummary.toLowerCase().includes(searchString) ||
                dataItem.consultationSession.expert.toLowerCase().includes(searchString) ||
                dataItem.consultationSession.scheduledFor.toLowerCase().includes(searchString) ||
                formatDateTimeString(dataItem.consultationSession.scheduledFor).toLowerCase().includes(searchString)
            ) {
                searchFilteredData = [...searchFilteredData, dataItem]
            }
        })
        setConsultationData(searchFilteredData)
    }
    return (
        <Page>
            <div className={classes.root}>
            <Paper className={classes.paper}>
                <BreadCrumbsComponent links={[{name: 'Expert Consultation', link: '/expert-consultation/request'}, {name: 'Past Consultations'}]}/>
                <div className={classes.durationFilter}>
                    <div>
                        <b>{consultationData.length} consultations </b> made in <SimpleSelect menuItems={menuItems} onChange={handleDurationChange}/>
                    </div>
                    <SearchComponent onChange={handleSearchChange}/>
                </div>
                {consultationData.map(({subject, _id, consultationSession: {expertSummary, expert, scheduledFor}}, index) => {
                    let expertName
                    let imageFileName
                    expertData.map(value => {
                        if (value._id === expert) {
                            expertName = value.name.split(" ")[0]
                            imageFileName = value.imageFileName
                        }
                    })
                    return (
                        <ConsultationSessionComponent
                            title={subject}
                            imgFileName={imageFileName}
                            sessionDate={formatDateTimeString(scheduledFor)}
                            expertName={expertName}
                            requestId={_id}
                            expertSummary={expertSummary}
                            lastComponent={index === consultationData.length - 1}/>
                    )
                })}
                {(consultationData.length === 0) && <RegretComponent/>}
            </Paper>
        </div>
        </Page>
    )
}