"use strict";

import React from 'react';
import Link from "@material-ui/core/Link";
import {withStyles} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Copyright} from "@material-ui/icons";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        bottom: 0,
        width: '100%'
        //minHeight: '100vh',
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
    copyright: {
        position: 'absolute',
        float: 'left',
        left: '2%',
        bottom: '20%'
    },
    footerLinks: {
        position: 'absolute',
        float: 'right',
        right: '2%',
        bottom: '20%'
    },
});

export class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {classes} = this.props;

        return (

            <div className={classes.root}>

                <footer className={classes.footer}>
                    <Container maxWidth="sm">
                        <Typography variant="body1">
                            <span className={classes.copyright}> © {new Date().getFullYear()} Jardin. All rights reserved.</span>
                            <span className={classes.footerLinks}>
                                  <Link>About</Link>
                                      <span> | </span>
                                  <Link>Contact Us</Link>
                                      <span> | </span>
                                  <Link>Newsletter</Link>
                            </span>
                        </Typography>
                    </Container>
                </footer>

            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Footer));