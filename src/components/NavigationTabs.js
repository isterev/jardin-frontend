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
        position: 'absolute',
        flexGrow: 1,
        height:40,
        width:'100%',
        backgroundColor:"#367c55",
        paddingLeft:200,
    },
    indicator: {
        backgroundColor: "#F50057"
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
                <Tabs classes = {{  indicator: classes.indicator}} value={this.props.selectedTab} onChange={this.handleTabChange}>
                    <Tab label="Blogs" value="/blogs" />
                    <Tab label="Forum" value="/forum" />
                    <Tab label="Marketplace" value="/offers" />
                    <Tab label="Expert Consultation" value="/consult" />
                    <Tab label="Customer Service" value="/service" />
                </Tabs>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(NavigationTabs));