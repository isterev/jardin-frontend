"use strict"

import React from 'react'

import underConstruction from '../../images/under_construction.jpg';
import Page from "../../components/Page";

export class CustomerServiceView extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (

            <Page>
                <img src={underConstruction} alt="underConstruction" style={{width: "73%", height: "73%", position: 'relative', bottom: '13px' }}/>
            </Page>
        )
    }
}