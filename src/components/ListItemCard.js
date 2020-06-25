import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {CardMedia} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import ItemDetailPage from "./ItemDetailPage";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 150,
        paddingTop: '56.25%',
        marginTop:'30',
    }
});
const ListItemCard = props => {
    const {title, price, imageUrl } = props;
    const preventDefault = (event) => event.preventDefault();

    return (
        <Card>
            <CardMedia style={{ height: "150px" }} image={imageUrl} />
            <CardContent>
                <Typography variant="body2" component="p">
                    <Link href="#" onClick={preventDefault}>
                        {title}
                        <br/>
                        {price}
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ListItemCard;