import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";

const styles = (theme) => ({
    root: {
        /*flexGrow: 1,
        backgroundColor: '#cfdf72',
        alignItems: 'center',
        justifyContent: 'center',
        //width: 700,
        height: 'auto',
        position: 'absolute',
        //top: '20%',
        left: '20%',*/
        flexGrow: 1,
        height:40,
        width:'100%',
        backgroundColor:"#367c55",
        paddingLeft:200,
    },
    tab: {
        border: '1px solid #2D6042', // '1px solid black'
        backgroundColor: 'white'
    },
    indicator: {
        backgroundColor: "blue"
    },
    Tabs: {

    },
});

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export class NavigationTabs extends React.Component {

    constructor(props) {
        super(props);

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(event, newValue) {

        event.stopPropagation()

        this.props.handleTabChange(newValue)

    };

    render() {

        const {classes} = this.props;

        return (

            <div className={classes.root}>
                <Tabs value={this.props.selectedTab} onChange={this.handleTabChange}>
                    <Tab label="Blogs" value="/blogs" {...a11yProps(0)} />
                    <Tab label="Forum" value="/forum" {...a11yProps(1)} />
                    <Tab label="Marketplace" value="/offers" {...a11yProps(2)} />
                    <Tab label="Expert Consultation" value="/consult" {...a11yProps(3)} />
                    <Tab label="Customer Service" value="/service" {...a11yProps(4)} />
                </Tabs>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(NavigationTabs));