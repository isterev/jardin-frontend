import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import Page from "../Page"
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import BreadCrumbsComponent from "../consultations/BreadCrumbsComponent";
import {Card, InputLabel, MenuItem} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#cfdf72',
    },
    card: {
        position: 'absolute',
        top: '25%',
        left: '20%',
        right: '20%',
        padding: '30px',
        borderRadius: '20px'
    },
    img: {
        height: 400,
        width: '35.8974358974',
        float: "left",
        display: "inline-block",
        alignContent: "left",
    },
    detailDiv: {
        paddingTop:'50px',
    },
    imageDiv: {
        float: "left",
        display: "flex",
        alignContent: "left",
        paddingTop:'50px',
        paddingRight:'25px',
        paddingLeft:'25px'
    },
    table: {
        minWidth: 150,
        backgroundColor: "#cfdf72",
    },
    text: {
        fontWeight: 600,
    },
    heading: {
        fontSize: '25px',
        lineHeight: '28px',
        margin: '0 0 2px',
    }
}))

function createData(name, values) {
    return {name, values}
}

export default function MarketOfferDetails(props) {
    const classes = useStyles()
    let productId = props.id
    const rows = [
        createData('Type', props.marketOffer.type),
        createData('Category', props.marketOffer.category),
        createData('Title', props.marketOffer.title),
        createData('Description', props.marketOffer.description),
        createData('Quantity', props.marketOffer.denomination),
        createData('Unit', props.marketOffer.pricePerUnit),
        createData('Price', props.marketOffer.pricePerUnit),
        createData('Contact', props.marketOffer.contact)
    ]
    return (
        <Page>
            <React.Fragment>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={(() => history.go(-1))}
                    style={{position: 'absolute', top: "190px", left: "370px"}}

                >
                    <KeyboardBackspaceIcon/> Go Back
                </Button>
            </React.Fragment>
            <Card className={classes.card}>
                <div className={classes.imageDiv}>
                    <img className={classes.img}
                         src={props.marketOffer.productImage}
                         alt="title"/>
                </div>
                <div className={classes.detailDiv}>
                    <h1 className={classes.heading}>{props.marketOffer.title}</h1>
                    <p>{props.marketOffer.description}</p><br/>
                    <p style={{marginTop: "-15px"}}><b>Type:</b> {props.marketOffer.type}</p><br/>
                    <p style={{marginTop: "-15px"}}><b>Category:</b> {props.marketOffer.category}</p><br/>
                    <p style={{marginTop: "-15px"}}><b>Denomination:</b> {props.marketOffer.denomination}</p><br/>
                    <p style={{marginTop: "-15px"}}><b>Price:</b> {props.marketOffer.pricePerUnit} EUR</p><br/>
                    <p style={{marginTop: "-15px"}}><b>Contact:</b> {props.marketOffer.contact}</p><br/>
                </div>
            </Card>
        </Page>
    )
}