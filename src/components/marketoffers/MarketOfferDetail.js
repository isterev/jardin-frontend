import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import Table from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"
import Page from "../Page"
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#cfdf72',
    },
    img: {
        height: 280,
        float: "left",
        display: "inline-block",
        alignContent: "left",

    },
    Box: {
        display: 'content',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '1',
        overflow: 'hidden',
        position: 'absolute',
        top: '25%',
    },
    detailDiv: {
        float: "right",
        paddingRight: 200,
        paddingLeft: 75,

    },
    imageDiv: {
        float: "left",
        display: "flex",
        alignContent: "left",
    },
    table: {
        minWidth: 150,
        backgroundColor: "#cfdf72",
    },
    text: {
        fontWeight: 600,
    }
}))

function createData(name, values) {
    return {name, values}
}

export default function MarketOfferDetails(props) {
    const classes = useStyles()

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
                    color="secondary"
                    className={classes.button}
                    onClick={(() => history.go(-1))}
                    style={{position: 'absolute', right: "400px", top: "140px"}}

                >
                    Go Back <KeyboardBackspaceIcon/>
                </Button>
            </React.Fragment>
            <Box className={classes.Box}>
                <img className={classes.img}
                     src={props.marketOffer.productImage}
                     alt="title"/>
                <div className={classes.detailDiv}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} border={0}>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell border="0" component="th" scope="row">
                                            <Typography className={classes.text}>
                                                {row.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">{row.values}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
        </Page>
    )
}