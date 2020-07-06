
import React from "react";
import Link from "@material-ui/core/Link";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#cfdf72',
        borderTop:'1px solid black'
    },
}));
export default function  PlainFooter(){
    const classes = styles();
        return (
            <BottomNavigation className={classes.stickToBottom}>
                <div position ="absolute" >
                <span className="myClass" style={{float : 'left'}} > © {new Date().getFullYear()} Jardin. All rights reserved.</span>
                <span className="myClass" style={{float : 'right'}} >
                    <Link >About    </Link>
                    <Link>  Contact Us  </Link>
                    <Link>Newsletter</Link>
                </span>
                </div>
            </BottomNavigation>

        );
    }
