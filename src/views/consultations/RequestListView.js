import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BreadCrumbsComponent from "../../components/consultations/BreadCrumbsComponent";
import SearchComponent from "../../components/consultations/SearchComponent";
import SimpleSelect from "../../components/consultations/SimpleSelect";
import RequestConsultationComponent from "../../components/consultations/RequestConsultationComponent";
import ExpertConsultationService from "../../services/ExpertConsultationService";
import RegretComponent from "../../components/consultations/RegretComponent";
import Page from "../../components/Page";
import UserService from "../../services/UserService";
import {filterByYear, filterForLastNDays, formatDateTimeString} from "../../components/util/ExpertUtils"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > *': {
            // marginLeft: theme.spacing(5),
            marginTop: theme.spacing(5),
            padding: theme.spacing(5),
            paddingBottom: theme.spacing(2)
        },
        height: '100%'
    },
    paper: {
        width: '87%',
        height: '100%',
        borderRadius: '10px',
        // backgroundColor: '#bfbfbf'
    },
    durationFilter: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: "Arial",
        fontSize: "16px",
        marginBottom: "20px",
    }
}));

export default function() {
    let [originalData, setOriginalData] = useState([]);
    let [requestData, setRequestData] = useState([]);
    let [durationFilter, setDurationFilter] = useState("last 30 days")
    let [searchFilter, setSearchFilter] = useState("")

    // effect executed when component mounts
    useEffect(
        () => {
            async function getAllConsultationRequests() {
                let currentUser = await UserService.getCurrentUser()
                return  ExpertConsultationService.getConsultationRequestsFor(currentUser['id'])
            }
            getAllConsultationRequests().then((allData) => {
                setOriginalData(allData)
                let durationFilteredData = filterForLastNDays(allData, 30)
                setRequestData(durationFilteredData)
            })
        }, []
    )
    // effect executed when the filters change value
    useEffect(
        ()=> {
            processFilters(durationFilter, searchFilter)
        }, [durationFilter, searchFilter]
    )

    const classes = useStyles();
    const menuItems = ["last 30 days", "last 6 months", "2020", "2019", "2018", "2017", "2016"]

    function handleSearchChange(e) {
        setSearchFilter(e.target.value.toLowerCase())
    }
    function handleDurationChange(e) {
        setDurationFilter(e.target.value)
    }

    function processFilters(durationValue, searchString) {
        let durationType = menuItems.indexOf(durationValue)
        let durationFilteredData = originalData
        switch (durationType) {
            case 0:
                durationFilteredData = filterForLastNDays(originalData, 30)
                break
            case 1:
                durationFilteredData = filterForLastNDays(originalData, 180)
                break
            default:
                durationFilteredData = filterByYear(originalData, durationValue)
                break
        }

        let searchFilteredData = []
        durationFilteredData.map((dataItem, index) => {
            if (dataItem.subject.toLowerCase().includes(searchString) ||
                dataItem.description.toLowerCase().includes(searchString) ||
                dataItem.firstPreference.toLowerCase().includes(searchString) ||
                formatDateTimeString(dataItem.firstPreference).toLowerCase().includes(searchString) ||
                dataItem.secondPreference.toLowerCase().includes(searchString) ||
                formatDateTimeString(dataItem.secondPreference).toLowerCase().includes(searchString) ||
                dataItem.thirdPreference.toLowerCase().includes(searchString) ||
                formatDateTimeString(dataItem.thirdPreference).toLowerCase().includes(searchString) ||
                dataItem.createdOn.toLowerCase().includes(searchString) ||
                formatDateTimeString(dataItem.createdOn).toLowerCase().includes(searchString)) {
                searchFilteredData = [...searchFilteredData, dataItem]
            }
        })
        setRequestData(searchFilteredData)
    }

    return (
        <Page>
            <div className={classes.root}>
            <Paper className={classes.paper}>
                <BreadCrumbsComponent links={[{name: 'Expert Consultation', link: '/expert-consultation/request'}, {name: 'Past Requests'}]}/>
                <div className={classes.durationFilter}>
                    <div>
                        <b>{requestData.length} requests </b> made in <SimpleSelect menuItems={menuItems} onChange={handleDurationChange}/>
                    </div>
                    <SearchComponent onChange={handleSearchChange}/>
                </div>
                {requestData.map(({subject, description, firstPreference, secondPreference, thirdPreference, category, createdOn, _id}, index) => {
                    let preferredDates = formatDateTimeString(firstPreference) + " | "
                        + formatDateTimeString(secondPreference) + " | " +
                        formatDateTimeString(thirdPreference)
                    return (
                        <RequestConsultationComponent
                            title={subject}
                            requestId={_id}
                            summary={description}
                            preferredDates={preferredDates}
                            category={category}
                            requestedOnDate={formatDateTimeString(createdOn)}
                            lastComponent={index === requestData.length - 1}/>
                    )
                })}
                {(requestData.length === 0) && <RegretComponent/>}
            </Paper>
        </div>
        </Page>
    );
}
