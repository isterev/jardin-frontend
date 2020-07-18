import React from "react"
import {Box} from "@material-ui/core"
import ListItemText from "@material-ui/core/ListItemText"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import RssFeedIcon from '@material-ui/icons/RssFeed'

const useStyles = makeStyles((theme) => ({
    Box:{
        display: 'content',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight:'1',
        overflow:'hidden',
        paddingTop:'75px',
    }
}))

export default function SideLink() {
        const classes = useStyles()
        return (
            <Box className={classes.Box} >
                <List >
                    <div>
                    <Typography variant="h6">
                        What's trending?
                        <IconButton color="inherit" >
                            <RssFeedIcon fontSize="medium"/>
                        </IconButton>
                    </Typography>
                    </div>
                    <ListItem>
                        <ListItemText>
                            <Typography>
                                Blogs and Forums
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography>
                                <Link>
                                    Better way to grow plants
                                </Link>
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography>
                                <Link>
                                    Herbs Gardening Tips
                                </Link>
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography >
                                <Link>
                                   Indoor Plants
                                </Link>
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Box>
        )
}