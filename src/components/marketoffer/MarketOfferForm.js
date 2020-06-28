"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';

import {Button, Card, InputLabel, MenuItem} from '@material-ui/core';

import {TextField, Select} from 'formik-material-ui';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import Page from '../Page';
import Box from "@material-ui/core/Box";
import AlertDialog from "../util/AlertDialog";

const styles = (theme) => ({
    root: {maxWidth: 500}
});

class MarketOfferForm extends React.Component {

    constructor(props) {
        super(props);
        this.isUpdate = false;

        if (this.props.marketOffer != undefined) {
            this.state = {
                category: props.marketOffer.category,
                title: props.marketOffer.title,
                description: props.marketOffer.description,
                denomination: props.marketOffer.denomination,
                pricePerUnit: props.marketOffer.pricePerUnit,
                //productImage: props.marketOffer.productImage //TODO
            };
            this.isUpdate = true;

        } else {
            this.state = {
                category: '',
                title: '',
                description: '',
                denomination: '',
                pricePerUnit: '',
                //productImage: null //TODO
            };
        }

        this.state.showDialog = false;
        this.state.values = {};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
    }

    handleSubmit(values, actions) {

        actions.setSubmitting(false);

        this.setState(state => ({
            showDialog: true,
            values: values
        }));
    }

    cancelAction() {

        this.setState(state => ({
            showDialog: false
        }));
    }

    confirmAction() {

        let marketOffer = this.props.marketOffer;
        if(marketOffer == undefined) {
            marketOffer = {};
        }

        marketOffer.category = this.state.values.category;
        marketOffer.title = this.state.values.title;
        marketOffer.description = this.state.values.description;
        marketOffer.denomination = this.state.values.denomination;
        marketOffer.pricePerUnit = this.state.values.pricePerUnit;

        this.props.onSubmit(marketOffer);

        this.setState(state => ({
            showDialog: false
        }));
    }


    // validation with yup
    getSchema() {
        return yup.object().shape({
            category: yup.string()
                .required('Category is required')
                .oneOf(
                    ['SEEDS_SMALL_PLANTS', 'FERTILISERS', 'MECHANICAL_EQUIPMENT', 'ELECTRONIC_EQUIPMENT', 'OTHERS'],
                    'Invalid category type'
                ),
            title: yup.string()
                .required('Title is required'),
            description: yup.string()
                .required('Description is required'),
            denomination: yup.string()
                .required('Denomination is required')
                .oneOf(
                    ['UNIT', 'PER_KG', 'PER_GRAM', 'PER_DAY'],
                    'Invalid Denomination type'
                ),
            pricePerUnit: yup.number()
                .required('Price per unit is required')
                .min(0, 'Must be non-negative')
                //.positive('Must be positive')
                .typeError("Price per unit is required")
        })
    };

    render() {

        const {classes} = this.props;

        return (

            <div class="scroll">
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Card style={{maxWidth: 500}}>
                        <Formik
                            initialValues={{
                                category: this.state.category,
                                title: this.state.title,
                                description: this.state.description,
                                denomination: this.state.denomination,
                                pricePerUnit: this.state.pricePerUnit
                            }}
                            validationSchema={this.getSchema}
                            onSubmit={this.handleSubmit}
                            render={() => (
                                <Form mode='structured'>

                                    <Box margin={1}>

                                        <br/>

                                        <InputLabel htmlFor="category">Category</InputLabel>
                                        <Field
                                            component={Select}
                                            name="category"
                                            inputProps={{
                                                id: 'category',
                                            }}
                                            style={{width: "66%"}}
                                        >
                                            <MenuItem value={'SEEDS_SMALL_PLANTS'}>seeds and small plants</MenuItem>
                                            <MenuItem value={'FERTILISERS'}>fertilisers</MenuItem>
                                            <MenuItem value={'MECHANICAL_EQUIPMENT'}>mechanical equipment</MenuItem>
                                            <MenuItem value={'ELECTRONIC_EQUIPMENT'}>electronic equipment</MenuItem>
                                            <MenuItem value={'OTHERS'}>others</MenuItem>
                                        </Field>

                                        <br/>

                                    </Box>
                                    <Box margin={1}>

                                        <Field
                                            component={TextField}
                                            name="title"
                                            label="Title"
                                            helperText="Specify a title"
                                            style={{width: "66%"}}
                                        />

                                        <br/>

                                    </Box>
                                    <Box margin={1}>

                                        <Field
                                            component={TextField}
                                            name='description'
                                            label='Description'
                                            helperText='Write a detailed description'
                                            multiline={true}
                                            rows='5'
                                            rowsMax='20'
                                            style={{width: "66%"}}
                                            // style={{width: "90%", height: "150px"}}
                                        />

                                        <br/>

                                    </Box>
                                    <Box margin={1}>

                                        <InputLabel htmlFor="category">Denomination</InputLabel>
                                        <Field
                                            component={Select}
                                            name="denomination"
                                            inputProps={{
                                                id: 'denomination',
                                            }}
                                            style={{width: "66%"}}
                                        >
                                            <MenuItem value={'UNIT'}>unit</MenuItem>
                                            <MenuItem value={'PER_KG'}>per kg</MenuItem>
                                            <MenuItem value={'PER_GRAM'}>per gram</MenuItem>
                                            <MenuItem value={'PER_DAY'}>per day</MenuItem>
                                        </Field>

                                        <br/>

                                    </Box>
                                    <Box margin={1}>

                                        <Field
                                            component={TextField}
                                            name="pricePerUnit"
                                            label="Price per unit"
                                            helperText="Define the price per unit"
                                            style={{width: "66%"}}
                                        />

                                        <br/>

                                    </Box>
                                    <Box margin={1}>

                                        <br/>
                                        <br/>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            onClick={(() => this.form.submit())}
                                        >
                                            Submit
                                        </Button>

                                        <Button
                                            // type="reset"
                                            variant="contained"
                                            color="secondary"
                                            onClick={(() => history.go(-1))}
                                        >
                                            Cancel
                                        </Button>

                                    </Box>

                                </Form>

                            )}
                        />
                    </Card>
                </Page>

                <AlertDialog open={this.state.showDialog} dialog={{
                    title: 'Confirm',
                    message: "Do you really want to " + (this.isUpdate ? "update" : "create")
                        + " this market offer?",
                    buttons: [
                        {
                            label: 'No',
                            cancelAction: this.cancelAction
                        },
                        {
                            label: 'Yes',
                            confirmAction: this.confirmAction
                        }
                    ]
                }}/>

            </div>

        )
    }
}

export default withRouter(MarketOfferForm);