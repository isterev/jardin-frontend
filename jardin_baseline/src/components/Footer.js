
import React from "react";
import Link from "@material-ui/core/Link";
export default function  PlainFooter(){
        return (
            <div className>
                <hr/>
                <span className="myClass" style={{float : 'left'}} > © {new Date().getFullYear()} Jardin. All rights reserved.</span>
                <span className="myClass" style={{float : 'right'}} >
                    <Link >About    </Link>
                    <Link>  Contact Us  </Link>
                    <Link>Newsletter</Link>
                </span>
            </div>

        );
    }
