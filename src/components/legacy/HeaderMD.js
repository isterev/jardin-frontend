"use strict";

import React from 'react';
import { Toolbar, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom'

import KebabMenu from './KebabMenu';


class HeaderMD extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar
                colored
                nav={<Button onClick={() => this.props.history.push('/')} icon>home</Button>}
                title={this.props.title}
                actions={<KebabMenu id="toolbar-colored-kebab-menu" />}>
            </Toolbar>
        );
    }
};

export default withRouter(HeaderMD);