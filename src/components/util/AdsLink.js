import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        imgPath:
            'https://thumbs.dreamstime.com/z/schubkarre-mit-gartenwerkzeugen-und-lange-blument%C3%B6pfe-auf-einem-hellen-hintergrund-mit-einem-platz-f%C3%BCr-ihre-werbung-vektor-76690089.jpg',
    },
    {
        imgPath:
            'https://3.bp.blogspot.com/-xOcjzXtNCeY/XMM2M_mCisI/AAAAAAAAbjw/S1KaXPQFzloTCjje_EW2wGuDFQiIosbEwCLcBGAs/s640/Barendorf.jpg',
    },
    {
        imgPath:
            'https://abancommercials.com/de/uploadComercial/1593.jpg',
    },
    {
        imgPath:
            'https://www.blumen-risse.de/media/image/b0/99/49/Blumen-Risse_Beilage_Maerkte_Web_VorschauseiteBBwemmvZkdX1b.jpg',
    },
    {
        imgPath:
            'https://transitionweimar.files.wordpress.com/2017/03/gartenwerbung.jpg?w=300&h=262',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
        paddingTop:125
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },
}));

function SwipeableTextMobileStepper() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
                <Typography>{tutorialSteps[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {tutorialSteps.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img className={classes.img} src={step.imgPath} alt={step.label} />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>

        </div>
    );
}

export default SwipeableTextMobileStepper;
