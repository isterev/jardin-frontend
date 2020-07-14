import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function valueprice(value) {
    return `${value}€`;
}

const useStyles = makeStyles((theme) => ({
    Box:{
        display: 'content',
        alignItems: 'center',
        justifyContent: 'center',
        border:1,
        borderColor:'black',
        overflow:'hidden',
        paddingTop:125
    },
    label:{
        fontWeight:'Bold',
        color:'black'
    },
    group:{
        paddingLeft: 20,
    }
}))
export default function CheckboxesGroup() {
    const classes = useStyles();
    const [value, setValue] = React.useState([5, 250]);

    const handleRangeChange = (event, newValue) => {
        setValue(newValue);
    };

    const [state, setState] = React.useState({
        sale: true,
        rental: false,
        seeds: false,
        fertilizer: false,
        mechanical: false,
        electrical: false,
        pesticide: false,
        others: true
    });

    const handleChange = event => {
        setState({ state, [event.target.name]: event.target.checked });
    };

    const {
        sale,
        rental,
        seeds,
        fertilizer,
        mechanical,
        electrical,
        pesticide,
        others
    } = state;

    return (
        <Box className={classes.Box}>
        <div >
            <FormControl component="fieldset">
                <FormLabel component="legend">
                    <Typography className={classes.label}>Marketplace</Typography>
                </FormLabel>
                <FormGroup className={classes.group}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={sale}
                                onChange={handleChange}
                                name="sale"
                                color="default"
                            />
                        }
                        label="Sale"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rental}
                                onChange={handleChange}
                                name="rental"
                                color="default"
                            />
                        }
                        label="Rental"
                    />
                </FormGroup>
                <div>
                    <Typography id="range-slider" gutterBottom className={classes.label}>
                        Price Range
                    </Typography>
                    <Slider
                        value={value}
                        color="default"
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valueprice}
                    />
                </div>
                <FormLabel component="legend" className={classes.label}>Category</FormLabel>
                <FormGroup className={classes.group}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={seeds}
                                onChange={handleChange}
                                name="seeds"
                                color="default"
                            />
                        }
                        label="Seeds"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fertilizer}
                                onChange={handleChange}
                                name="fertilizer"
                                color="default"
                            />
                        }
                        label="Fertilizer"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={mechanical}
                                onChange={handleChange}
                                name="mechanical"
                                color="default"
                            />
                        }
                        label="Mechanical Equipment"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={electrical}
                                onChange={handleChange}
                                name="electrical"
                                color="default"
                            />
                        }
                        label="Electrical Equipment"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={pesticide}
                                onChange={handleChange}
                                name="pesticide"
                                color="default"
                            />
                        }
                        label="Pesticide"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={others}
                                onChange={handleChange}
                                name="others"
                                color="default"
                            />
                        }
                        label="Others"
                    />
                </FormGroup>
            </FormControl>
        </div>
        </Box>
    );
}
