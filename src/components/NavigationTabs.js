import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
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
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, newValue) {
        //alert(newValue);
        this.setState(state => ({
            value: newValue //location.pathname
        }));

        this.props.history.push(newValue);

    };

    render() {

        const {classes} = this.props;

        return (

            <div className={classes.root}>
                <Tabs classes={{indicator: classes.indicator}} value={location.pathname} onChange={this.handleChange}>
                    <Tab className={classes.tab} label="Blogs" component={Link} to="/blogs" value="/blogs" />
                    <Tab className={classes.tab} label="Forum" component={Link} to="/forum" value="/forum" />
                    <Tab className={classes.tab} label="Marketplace" component={Link} to="/offers" value="/offers" />
                    <Tab className={classes.tab} label="Expert Consultation" component={Link} to="/consult" value="/consult" />
                    <Tab className={classes.tab} label="Customer Service" component={Link} to="/service" value="/service" />

                </Tabs>
                {/*<Tabs classes={{indicator: classes.indicator}} value={location.pathname} onChange={this.handleChange}>
                    <Tab className={classes.tab} label="Blogs" component={Link} to="/blogs"/>
                    <Tab className={classes.tab} label="Forum" component={Link} to="/forum"/>
                    <Tab className={classes.tab} label="Marketplace" component={Link} to="/offers"/>
                    <Tab className={classes.tab} label="Expert Consultation" component={Link} to="/consult"/>
                    <Tab className={classes.tab} label="Customer Service" component={Link} to="/service"/>
                </Tabs>*/}
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(NavigationTabs));