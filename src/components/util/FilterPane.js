import React, {useEffect} from "react"
import {makeStyles} from "@material-ui/core/styles"
import FormLabel from "@material-ui/core/FormLabel"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    Box: {
        display: 'content',
        alignItems: 'center',
        justifyContent: 'center',
        border: 1,
        borderColor: 'black',
        overflow: 'hidden',
        paddingTop: 125
    },
    label: {
        fontWeight: 'Bold',
        color: 'black'
    },
    group: {
        paddingLeft: 20,
    },
    slider: {
        width: 200,
    }
}))


function valuetext(value) {
    return `${value}`;
}

export default function CheckboxesGroup(props) {
    const classes = useStyles()
    const [value, setValue] = React.useState([0, 100])
    const [sale, setSale] = React.useState(true)
    const [rental, setRental] = React.useState(true)
    const [seeds, setSeeds] = React.useState(true)
    const [fertiliser, setFertiliser] = React.useState(true)
    const [mechanical, setMechanical] = React.useState(true)
    const [electronic, setElectronic] = React.useState(true)
    const [others, setOthers] = React.useState(true)

    useEffect(() => {
        props.handleFilterChange({
            'Sale': sale, 'Rental': rental, 'Seeds and Small Plants': seeds, 'Fertilisers': fertiliser,
            'Mechanical Equipment': mechanical,
            'Electronic Equipment': electronic,
            'Others': others,
        }, value)
    }, [sale, rental, seeds, fertiliser, mechanical, electronic, others, value])

    const handleValueChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'Sale':
                setSale(e.target.checked)
                break
            case 'Rental':
                setRental(e.target.checked)
                break
            case 'Seeds':
                setSeeds(e.target.checked)
                break
            case 'Fertiliser':
                setFertiliser(e.target.checked)
                break
            case 'Mechanical':
                setMechanical(e.target.checked)
                break
            case 'Electronic':
                setElectronic(e.target.checked)
                break
            case 'Others':
                setOthers(e.target.checked)
                break
        }
    }

    return (
        <Box className={classes.Box}>
            <div>
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
                                    name='Sale'
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
                                    name='Rental'
                                    color="default"
                                />
                            }
                            label="Rental"
                        />
                    </FormGroup>
                    <div className={classes.slider}>
                        <Typography id="range-slider" gutterBottom>
                            price range
                        </Typography>
                        <Slider
                            value ={value}
                            onChange={handleValueChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                    </div>
                    <FormLabel component="legend" className={classes.label}>Category</FormLabel>
                    <FormGroup className={classes.group}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={seeds}
                                    onChange={handleChange}
                                    name='Seeds'
                                    color="default"
                                />
                            }
                            label="Seeds and Small Plants"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={fertiliser}
                                    onChange={handleChange}
                                    name='Fertiliser'
                                    color="default"
                                />
                            }
                            label="Fertiliser"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={mechanical}
                                    onChange={handleChange}
                                    name='Mechanical'
                                    color="default"
                                />
                            }
                            label="Mechanical Equipment"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={electronic}
                                    onChange={handleChange}
                                    name='Electronic'
                                    color="default"
                                />
                            }
                            label="Electrical Equipment"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={others}
                                    onChange={handleChange}
                                    name='Others'
                                    color="default"
                                />
                            }
                            label="Others"
                        />
                    </FormGroup>
                </FormControl>
            </div>
        </Box>
    )
}
