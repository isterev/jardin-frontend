import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#cfdf72',
        alignItems: 'center',
        justifyContent: 'center',
        //width: 700,
        height: 'auto',
        position: 'absolute',
        //top: '20%',
        left: '20%',
    },
    tab: {
        border: '1px solid black',
        backgroundColor: 'white'
    },
    indicator: {
        backgroundColor: "blue"
    }
});

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
                <Tabs indicatorColor="primary"
                      textColor="primary" value={this.props.selectedTab} onChange={this.handleTabChange}>
                    <Tab className={classes.tab} label="Blogs" value="/blogs" />
                    <Tab className={classes.tab} label="Forum" value="/forum" />
                    <Tab className={classes.tab} label="Marketplace" value="/offers" />
                    <Tab className={classes.tab} label="Expert Consultation" value="/consult" />
                    <Tab className={classes.tab} label="Customer Service" value="/service" />
                </Tabs>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(NavigationTabs));