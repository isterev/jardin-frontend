import React from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Page from "../Page";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#cfdf72',
    },
    img: {
        height:280,
        float:"left",
        display:"inline-block",
        alignContent:"left",
        
    },
    Box:{
        display: 'content',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight:'1',
        overflow:'hidden',
        position: 'absolute',
        top: '20%',
    },
    detailDiv:{
        float:"right",
        paddingRight: 200,
    },
    imageDiv:{
        float:"left",
        display:"flex",
        alignContent:"left",
    },
    table: {
        minWidth: 150,
        backgroundColor:"#cfdf72",
    },

}));

function createData(name, values) {
    return { name, values };
}

export default function MarketOfferDetails(props) {
    const classes = useStyles();

    const rows = [
        createData('Type', props.marketOffer.type),//todo
        createData('Category', props.marketOffer.category),
        createData('Title', props.marketOffer.title),
        createData('Description', props.marketOffer.description),
        createData('Quantity', props.marketOffer.denomination),//todo
        createData('Unit', props.marketOffer.pricePerUnit),//todo
        createData('Price', props.marketOffer.pricePerUnit),
        createData('Contact', props.marketOffer.contact)
    ];
    return(
        <Page>
        <Box className={classes.Box}>
            <img className={classes.img}
                 src ="https://www.mercurynews.com/wp-content/uploads/2020/04/SJM-L-GARTIPS-0412-01_73870816.jpg?w=839"
                 alt ="title"/>
        <div className={classes.detailDiv}>
        <TableContainer component={Paper}>
            <Table className={classes.table} border={0}>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell border= "0" component="th" scope="row">
                                {row.name}
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
    )};