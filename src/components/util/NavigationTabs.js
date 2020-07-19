import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {withStyles} from "@material-ui/styles"
import {withRouter} from "react-router-dom"

const styles = (theme) => ({
    root: {
        position: 'absolute',
        flexGrow: 1,
        height: 48,
        width: '100%',
        backgroundColor: "#367c55",
        paddingLeft: 220,
    },
    tabs: {
        textTransform: 'none',
        color: '#ededed',
        fontWeight: '700',
        fontSize: 'initial',
        '&:hover': {
            border: '1.5px solid black'
        },
    },
})

export class NavigationTabs extends React.Component {

    constructor(props) {
        super(props)
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(event, newValue) {
        event.stopPropagation()
        this.props.handleTabChange(newValue)
    }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Tabs value={this.props.selectedTab} onChange={this.handleTabChange}>
                    <Tab className={classes.tabs} label="Blogs" value="/blogs"/>
                    <Tab className={classes.tabs} label="Forum" value="/forum"/>
                    <Tab className={classes.tabs} label="Marketplace" value="/offers"/>
                    <Tab className={classes.tabs} label="Expert Consultation" value="/expert-consultation/request"/>
                    <Tab className={classes.tabs} label="Customer Service" value="/service"/>
                </Tabs>
            </div>
        )
    }
}

export default withStyles(styles)(withRouter(NavigationTabs))