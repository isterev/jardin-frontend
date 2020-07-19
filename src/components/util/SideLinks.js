import React from "react"
import IconButton from "@material-ui/core/IconButton"
import RssFeedSharpIcon from '@material-ui/icons/RssFeedSharp';


export default function SideLink() {
    return (
        <div style={{borderRight: '1px solid rgba(0, 0, 0, .3)', height: '500px', paddingTop: '75px', paddingLeft:'10px', paddingRight:'10px'}}>
           <div style={{float:"left"}}>
                <h2>
                    What is trending
                </h2>
           </div>
            <div style={{float:"right"}}>
                <IconButton color="inherit">
                    <RssFeedSharpIcon fontSize="medium"/>
                </IconButton>
           </div>
            <a href = 'https://www.gardendesign.com/trends/2020.html'>
            <div>
                <h4 style={{fontWeight:"Bold"}}> Garden Design 2020</h4>
                <p>We share 9 noteworthy trends shaping the gardening world in 2020.</p>
            </div>
            </a>
            <a href = 'https://kidsgardening.org/'>
                <div>
                    <h4 style={{fontWeight:"Bold"}}> Kids Gardening</h4>
                    <p>We create opportunities for kids to learn and grow through gardening, engaging their natural curiosity and wonder.</p>
                </div>
            </a>
            <a href = 'https://www.planetnatural.com/growing-indoors/'>
                <div>
                    <h4 style={{fontWeight:"Bold"}}> Indoor and Herbs Collection</h4>
                    <p>City dwellers, or those without a good gardening spot in the yard, may find growing indoors especially useful.</p>
                </div>
            </a>
        </div>
    )
}