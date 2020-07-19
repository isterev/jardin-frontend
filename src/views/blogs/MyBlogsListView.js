import React, {useEffect, useState} from "react";
import Page from "../../components/Page";
import Paper from "@material-ui/core/Paper";
import SimpleSelect from "../../components/consultations/SimpleSelect";
import SearchComponent from "../../components/consultations/SearchComponent";
import {makeStyles} from "@material-ui/core/styles";
import UserService from "../../services/UserService";
import MyBlogsComponent from "../../components/blogs/MyBlogsComponent";
import BlogService from "../../services/BlogService";
import {filterByYear, filterForLastNDays} from "../../components/util/ExpertUtils";
import Button from "@material-ui/core/Button";
import PostAddTwoToneIcon from "@material-ui/icons/PostAddTwoTone";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(10),
            padding: theme.spacing(5),
            paddingBottom: theme.spacing(2)
        },
        width: '1250px'
    },
    paper: {
        width: '1250px',
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
}));

export default function() {
    const classes = useStyles()
    const menuItems = ["last 30 days", "last 6 months", "2020", "2019", "2018", "2017", "2016"]
    const [loading, setLoading] = useState(true)
    const [allBlogData, setAllBlogData] = useState([])
    const [blogData, setBlogData] = useState([])
    let [durationFilter, setDurationFilter] = useState(["last 30 days"])
    let [searchFilter, setSearchFilter] = useState("")
    useEffect(() => {
        async function getCurrentUser() {
            return UserService.getCurrentUser();
        }
        async function getBlogData(id) {
            return BlogService.getBlogsFor(id)
        }
        getCurrentUser().then((value) =>
            getBlogData(value['id']).then((allBlogData) => {
                setAllBlogData(allBlogData)
                setBlogData(filterForLastNDays(allBlogData, 30, true))
                setLoading(false)
            })
        )
    }, [])
    useEffect(()=>{
        processFilters(durationFilter, searchFilter)
    }, [durationFilter, searchFilter])

    function handleDurationChange(e) {
        setDurationFilter(e.target.value)
    }

    function handleSearchChange(e) {
        setSearchFilter(e.target.value)
    }
    function processFilters(durationValue, searchString) {
        searchString = searchString.toLowerCase()
        let durationType = menuItems.indexOf(durationValue)
        let durationFilteredData = allBlogData
        console.log(durationType + searchString)
        switch (durationType) {
            case -1:
                durationFilteredData = filterForLastNDays(allBlogData, 30, true)
                break
            case 0:
                durationFilteredData = filterForLastNDays(allBlogData, 30, true)
                break
            case 1:
                durationFilteredData = filterForLastNDays(allBlogData, 180, true)
                break
            default:
                durationFilteredData = filterByYear(allBlogData, durationValue, true)
                break
        }

        let searchFilteredData = []
        durationFilteredData.map((dataItem, index) => {
            if (dataItem.articleTitle.toLowerCase().includes(searchString) ||
                dataItem.articleBody.toLowerCase().includes(searchString) ||
                dataItem.createdAt.toLowerCase().includes(searchString) ||
                formatDateTimeString(dataItem.createdAt).toLowerCase().includes(searchString))
                searchFilteredData = [...searchFilteredData, dataItem]
        })
        setBlogData(searchFilteredData)
    }

    let history = useHistory()
    return (
        <Page>
             <span className={classes.add}> <Button variant='contained' color='primary'
                                                    onClick={() => history.push("/postBlog")}
             > Post a blog  <PostAddTwoToneIcon/>  </Button>  </span>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <div className={classes.durationFilter}>
                        <div>
                            <b>{blogData.length} requests </b> made in <SimpleSelect menuItems={menuItems} onChange={handleDurationChange}/>
                        </div>
                        <SearchComponent onChange={handleSearchChange}/>
                    </div>
                    <div>
                        {
                            !loading &&
                                blogData.map(({articleTitle, createdAt, articleBody, _id}, index) => {
                                    return <MyBlogsComponent title={articleTitle} body={articleBody} createdAt={formatDateTimeString(createdAt)} lastComponent={index===blogData.length - 1}/>
                                })
                        }
                    </div>
                </Paper>
            </div>
        </Page>
    );

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
        } else {
            preferred_time = preferred_time_slot.getHours() % 12 + preferred_time + ' PM'
        }
        preferred_date = preferred_date + ' ' + preferred_time
        return preferred_date;
    }
}

