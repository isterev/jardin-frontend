"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom';

import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';

import {Button, Card, InputLabel, MenuItem} from '@material-ui/core';

import {TextField} from 'formik-material-ui';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import Page from '../Page';
import Select from "@material-ui/core/Select";

const style = {maxWidth: 500};


class MarketOfferForm extends React.Component {

    constructor(props) {
        super(props);
        this.isUpdate = false;

        if(this.props.marketOffer != undefined) {
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
                pricePerUnit: 0,
                //productImage: null //TODO
            };
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values) {
        confirmAlert({
            title: 'Confirm',
            message: "Do you really want to " + (this.isUpdate? "update" : "create") + " this market offer?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmOk(values)
                },
                {
                    label: 'No'
                }
            ]
        });

    }

    confirmOk(values) {

        let marketOffer = this.props.marketOffer;
        if(marketOffer == undefined) {
            marketOffer = {};
        }

        marketOffer.category = values.category;
        marketOffer.title = values.title;
        marketOffer.description = values.description;
        marketOffer.denomination = values.denomination;
        marketOffer.pricePerUnit = values.pricePerUnit;

        this.props.onSubmit(marketOffer);
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
                    ['UNIT','PER_KG', 'PER_GRAM', 'PER_DAY'],
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
        return (

            /*<div class="scroll">
                <Page>
                    <br/>
                    <br/>
                    <br/>
                    <Card style={style}>
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
                                    <br/>

                                    <InputLabel htmlFor="category">Category</InputLabel>
                                    <Field
                                        component={Select}
                                        name="category"
                                        inputProps={{
                                            id: 'category',
                                        }}
                                    >
                                        <MenuItem value={'SEEDS_SMALL_PLANTS'}>seeds and small plants</MenuItem>
                                        <MenuItem value={'FERTILISERS'}>fertilisers</MenuItem>
                                        <MenuItem value={'MECHANICAL_EQUIPMENT'}>mechanical equipment</MenuItem>
                                        <MenuItem value={'ELECTRONIC_EQUIPMENT'}>electronic equipment</MenuItem>
                                        <MenuItem value={'OTHERS'}>others</MenuItem>
                                    </Field>

                                    <Field
                                        component={TextField}
                                        name="title"
                                        label="Title"
                                        helperText = "Specify a title"
                                        InputProps={{ notched: true }}
                                    />;

                                    <Field
                                        component={TextField}
                                        name='description'
                                        label='Description'
                                        helperText = 'Write a detailed description'
                                        multiline = {true}
                                        rows = '5'
                                        rowsMax = '20'
                                        // style={{width: "90%", height: "150px"}}
                                    />;

                                    <InputLabel htmlFor="category">Denomination</InputLabel>
                                    <Field
                                        component={Select}
                                        name="denomination"
                                        inputProps={{
                                            id: 'denomination',
                                        }}
                                    >
                                        <MenuItem value={'UNIT'}>unit</MenuItem>
                                        <MenuItem value={'PER_KG'}>per kg</MenuItem>
                                        <MenuItem value={'PER_GRAM'}>per gram</MenuItem>
                                        <MenuItem value={'PER_DAY'}>per day</MenuItem>
                                    </Field>

                                    <Field
                                        component={TextField}
                                        name="pricePerUnit"
                                        label="Price per unit"
                                        helperText = "Define the price per unit"
                                        InputProps={{ notched: true }}
                                    />;

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
                                        onClick={(() => history.go(-1))}>
                                    >
                                        Cancel
                                    </Button>

                                </Form>

                            )}
                        />
                    </Card>
                </Page>

            </div>*/
        )
    }
}

export default withRouter(MarketOfferForm);