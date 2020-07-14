import React from "react";
import {Box} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    Box:{
        position: "fixed",
        display: 'content',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight:'1',
        overflow:'hidden',
        paddingTop:'75px'
    }
}))


export default function SideLink() {
        const classes = useStyles();
        return (
            <Box className={classes.Box} >
                <List >
                    <Typography variant="h5" align ="center" >
                        What's trending?
                    </Typography>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" align ="center">
                                Blogs and Forums
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography align ="center" justify="center" >
                                <Link>
                                    Better way to grow tomatoes
                                </Link>
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography align ="center" justify="center">
                                <Link>
                                    Herbs Gardening Tips
                                </Link>
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography align ="center" justify="center">
                                <Link>
                                   Indoor Plants
                                </Link>
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Box>
        );
}