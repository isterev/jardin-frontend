import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles( () => ({
    breadCrumbsComponent: {
        marginBottom: '25px'
    }
}))

export default function({links}) {
    let classes = useStyles()
    let previousLinks = links.slice(0, links.length - 1)
    let currentLink = links.slice(links.length - 1)
    return (
        <div className={classes.breadCrumbsComponent}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {previousLinks.map(({name, link}) => {
                    return (
                        <Link color="inherit" href={"#" + link}>
                            {name}
                        </Link>
                    )
                })}
                <Typography color="textPrimary">{currentLink[0].name}</Typography>
            </Breadcrumbs>
        </div>
    );
}