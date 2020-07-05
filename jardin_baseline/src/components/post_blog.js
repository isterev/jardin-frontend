import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TextareaAutosize } from '@material-ui/core';


function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}

        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#cfdf72',
    },
    AppBar: {
        BackgroundColor:"#cfdf72",
        textColor:'black',
    },

    Tabs:{
        border: '1px solid black',
        backgroundColor:'white'
    },
    indicator: {
        backgroundColor: "blue"
    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs classes={{ indicator: classes.indicator }} value={value} onChange={handleChange} >
                <Tab className={classes.Tabs} label="Blogs" {...a11yProps(0)} />
                <Tab className={classes.Tabs} label="Forum" {...a11yProps(1)} />
                <Tab className={classes.Tabs} label="Marketplace" {...a11yProps(2)} />
                <Tab className={classes.Tabs} label="Expert Consultation" {...a11yProps(3)} />
                <Tab className={classes.Tabs} label="Customer Service" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
            <div class="textbox">
            <header >
             <p> <b>Post A Blog </b> </p>
            <TextareaAutosize class="box" aria-label="minimum height" rowsMin={3} placeholder="Article Title" style={{width: '835px'}}/> <br></br>
            <TextareaAutosize class="box" aria-label="minimum height" rowsMin={15} placeholder="Article Body" style={{width: '835px'}}/>
            <br></br>
            <span style = {{paddingLeft: "290px"}} > <Button variant='contained' color='primary'  > Submit </Button>  </span>
            <span > <Button variant='contained' color='primary' > Upload an Image </Button>  </span>
            </header>
            </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                welcome to Forum
            </TabPanel>
            <TabPanel value={value} index={2}>
                welcome to market
            </TabPanel>
            <TabPanel value={value} index={3}>
                welcome to Expert consultation
            </TabPanel>
            <TabPanel value={value} index={4}>
                welcome to customer service
            </TabPanel>
        </div>
    );
}