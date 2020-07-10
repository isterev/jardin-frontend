"use strict";

import React from 'react';

import MyConsultationsList from '../../components/consultations/MyConsultationsList';

// import ConsultationsService from '../../services/ConsultationsService';


export class MyConsultationsListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        // TODO
        /*ConsultationsService.getConsultations().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });*/
    }

    render() {
        // TODO
        /*if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }*/

        return (
            <MyConsultationsList data={this.state.data}/>
        );
    }
}
