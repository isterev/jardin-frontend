"use strict";

import React from 'react';
import Link from "@material-ui/core/Link";
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";

const styles = (theme) => ({
    copyright: {
        float : 'left'
    },
    footerLinks: {
        float : 'right'
    },
});

export class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {classes} = this.props;

        return (
            <div>
                <hr/>
                <span className={classes.copyright} > © {new Date().getFullYear()} Jardin. All rights reserved.</span>
                <span className={classes.footerLinks}>
                    <Link>About</Link>
                    <span> | </span>
                    <Link>Contact Us</Link>
                    <span> | </span>
                    <Link>Newsletter</Link>
                </span>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Footer));