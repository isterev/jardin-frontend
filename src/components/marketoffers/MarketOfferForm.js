"use strict"

import React from 'react'
import {withRouter} from 'react-router-dom'

import {Field, Form, Formik} from 'formik'
import * as yup from 'yup'

import {Button, Card, InputLabel, MenuItem} from '@material-ui/core'

import {Select, TextField} from 'formik-material-ui'

import Page from '../Page'
import AlertDialog from "../util/AlertDialog"
import {withStyles} from "@material-ui/styles"
import Grid from "@material-ui/core/Grid"
import ImageUploadCard from "../util/ImageUpload"
import Box from "@material-ui/core/Box"
import InputAdornment from "@material-ui/core/InputAdornment";
import PublishIcon from "@material-ui/icons/Publish";
import CancelIcon from "@material-ui/icons/Cancel";
import FormHelperText from "@material-ui/core/FormHelperText";


const styles = (theme) => ({
    root: {
        maxWidth: 500,
        textAlign: 'center'
    },
    card: {
        position: 'absolute',
        top: '20%',
        left: '20%',
        right: '20%',
    },
    imageUpload: {
        position: 'absolute',
        left: '33px'
    },
    field: {
        width: "80%",
        marginBottom: '30px',
        '& label.Mui-focused': {
            color: 'primary',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'primary',
        },

    },
    select: {
        width: "80%",//width: '250px',
        '& .MuiInputLabel-shrink': {
            color: 'primary',
            '& .Mui-focused': {
                borderBottomColor: 'primary',
            }
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'primary',
        },
    },
    label: {
        '& MuiFormHelperText-filled': {
            color: 'primary'
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        //padding: '20px',
        position: 'relative',
        top: '-70px'
    },
    button: {
        margin: '3px'
    }
})

class MarketOfferForm extends React.Component {

    constructor(props) {
        super(props)

        this.isUpdate = false
        this.state = {}

        if (this.props.marketOffer !== undefined) {
            this.state.values = {
                type: props.marketOffer.type,
                category: props.marketOffer.category,
                title: props.marketOffer.title,
                description: props.marketOffer.description,
                denomination: props.marketOffer.denomination,
                pricePerUnit: props.marketOffer.pricePerUnit,
                productImage: props.marketOffer.productImage
            }
            this.isUpdate = true

        } else {
            this.state.values = {
                type: '',
                category: '',
                title: '',
                description: '',
                denomination: '',
                pricePerUnit: '',
                productImage: null
            }
        }

        this.state.showDialog = false

        this.handleSubmit = this.handleSubmit.bind(this)
        this.cancelAction = this.cancelAction.bind(this)
        this.confirmAction = this.confirmAction.bind(this)
    }

    handleSubmit(values, actions) {

        actions.setSubmitting(false)

        this.setState(state => ({
            showDialog: true,
            values: values
        }))
    }

    cancelAction() {

        this.setState(state => ({
            showDialog: false
        }))
    }

    confirmAction() {

        let marketOffer = this.props.marketOffer
        if (marketOffer === undefined) {
            marketOffer = {}
        }

        marketOffer.type = this.state.values.type
        marketOffer.category = this.state.values.category
        marketOffer.title = this.state.values.title
        marketOffer.description = this.state.values.description
        marketOffer.denomination = this.state.values.denomination
        marketOffer.pricePerUnit = this.state.values.pricePerUnit
        marketOffer.productImage = this.state.values.productImage

        this.props.onSubmit(marketOffer)

        this.setState(state => ({
            showDialog: false
        }))
    }


    // validation with yup
    getSchema() {
        return yup.object().shape({
            productImage: yup.mixed().required('Product image is required'),
            productImageSize: yup.number().max(10485760, 'Image file size is too big!'), // 10485760 = 10 MB
            type: yup.string()
                .required('Type is required')
                .oneOf(
                    ['Rental', 'Sale'],
                    'Invalid type'
                ),
            category: yup.string()
                .required('Category is required')
                .oneOf(
                    ['Seeds and Small Plants', 'Fertilisers', 'Mechanical Equipment', 'Electronic Equipment', 'Others'],
                    'Invalid category type'
                ),
            title: yup.string()
                .required('Title is required'),
            description: yup.string()
                .required('Description is required'),
            denomination: yup.string()
                .required('Denomination is required')
                .oneOf(
                    ['unit', 'per kg', 'per gram', 'per day'],
                    'Invalid Denomination type'
                ),
            pricePerUnit: yup.number()
                .required('Price per unit is required')
                .min(0, 'Must be non-negative')
                //.positive('Must be positive')
                .typeError("Price per unit is required")
        })
    }

    render() {

        const {classes} = this.props

        return (

            <div className={classes.scroll}>
                <Page>
                    <Card className={classes.card}>
                        <Formik
                            initialValues={{
                                type: this.state.values.type,
                                category: this.state.values.category,
                                title: this.state.values.title,
                                description: this.state.values.description,
                                denomination: this.state.values.denomination,
                                pricePerUnit: this.state.values.pricePerUnit,
                                productImage: this.state.values.productImage
                            }}
                            validationSchema={this.getSchema}
                            onSubmit={this.handleSubmit}
                            render={({values, touched, errors}) => (
                                <Form mode='structured'>

                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <br/>
                                            <Box className={classes.imageUpload}>
                                                <InputLabel htmlFor="productImage">Upload Image</InputLabel>
                                                <Field
                                                    component={ImageUploadCard}
                                                    name="productImage"
                                                    inputProps={{
                                                        id: 'productImage',
                                                    }}
                                                />
                                                <Field
                                                    component={TextField}
                                                    name="productImageSize"
                                                    style={{display: "none"}}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <br/>
                                            <FormHelperText
                                                error={touched["type"] && errors["type"]}>Type</FormHelperText>
                                            <Field
                                                component={Select}
                                                name="type"
                                                inputProps={{
                                                    id: 'type',
                                                }}
                                                className={classes.select}
                                            >
                                                <MenuItem value={'Rental'}>Rental</MenuItem>
                                                <MenuItem value={'Sale'}>Sale</MenuItem>
                                            </Field>
                                            {
                                                touched["type"] &&
                                                errors["type"] &&
                                                <FormHelperText error={true}>
                                                    {errors["type"]}
                                                </FormHelperText>
                                            }
                                            <br/>
                                            <FormHelperText
                                                error={touched["category"] && errors["category"]}>Category</FormHelperText>
                                            <Field
                                                component={Select}
                                                name="category"
                                                inputProps={{
                                                    id: 'category',
                                                }}
                                                className={classes.select}
                                            >
                                                <MenuItem value={'Seeds and Small Plants'}>Seeds and Small
                                                    Plants</MenuItem>
                                                <MenuItem value={'Fertilisers'}>Fertilisers</MenuItem>
                                                <MenuItem value={'Mechanical Equipment'}>Mechanical Equipment</MenuItem>
                                                <MenuItem value={'Electronic Equipment'}>Electronic Equipment</MenuItem>
                                                <MenuItem value={'Others'}>Others</MenuItem>
                                            </Field>
                                            {
                                                touched["category"] &&
                                                errors["category"] &&
                                                <FormHelperText error={true}>
                                                    {errors["category"]}
                                                </FormHelperText>
                                            }
                                            <Field
                                                component={TextField}
                                                name="title"
                                                label="Title"
                                                className={classes.field}
                                            />
                                            <Field
                                                component={TextField}
                                                name='description'
                                                label='Description'
                                                multiline={true}
                                                rows='7'
                                                rowsMax='25'
                                                className={classes.field}
                                                style={{position: 'relative', top: '-30px'}}
                                            />
                                            <FormHelperText style={{position: 'relative', top: '-63px'}}
                                                error={touched["denomination"] && errors["denomination"]}>Denomination</FormHelperText>
                                            <Field
                                                component={Select}
                                                name="denomination"
                                                inputProps={{
                                                    id: 'denomination',
                                                }}
                                                className={classes.select}
                                                style={{position: 'relative', top: '-63px'}}
                                            >
                                                <MenuItem value={'unit'}>unit</MenuItem>
                                                <MenuItem value={'per kg'}>per kg</MenuItem>
                                                <MenuItem value={'per gram'}>per gram</MenuItem>
                                                <MenuItem value={'per day'}>per day</MenuItem>
                                            </Field>
                                            {
                                                touched["denomination"] &&
                                                errors["denomination"] &&
                                                <FormHelperText error={true}>
                                                    {errors["denomination"]}
                                                </FormHelperText>
                                            }
                                            <Field
                                                component={TextField}
                                                name="pricePerUnit"
                                                label="Price per unit"
                                                className={classes.field}
                                                style={{position: 'relative', top: '-61px'}}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            EUR
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} className={classes.buttons}>

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                            >
                                                Submit <PublishIcon/>
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                onClick={(() => history.go(-1))}
                                            >
                                                Cancel <CancelIcon/>
                                            </Button>
                                        </Grid>
                                    </Grid>


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

export default withStyles(styles)(withRouter(MarketOfferForm))