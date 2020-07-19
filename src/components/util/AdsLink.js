import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        imgPath:
            'https://cdn3.vectorstock.com/i/1000x1000/04/07/garden-shop-poster-with-agricultural-tools-on-lawn-vector-22310407.jpg',
    },
    {
        imgPath:
            'https://cdn5.vectorstock.com/i/1000x1000/89/04/realistic-garden-tools-poster-vector-22958904.jpg',
    },
    {
        imgPath:
            'https://pub-static.haozhaopian.net/assets/projects/pages/998f1e5b-0f2c-47f5-a15c-e1b459e24c43_d60d80ae-1543-4431-9c89-a071d44d13cf_thumb.jpg',
    },
    {
        imgPath:
            'https://as1.ftcdn.net/jpg/02/35/62/84/500_F_235628436_tsLu5rjd6WwXhHTXSd57gx7iy6yt63Kq.jpg',
    },
    {
        imgPath:
            'https://previews.123rf.com/images/alekseiderin/alekseiderin1605/alekseiderin160500096/58449458-poster-with-tools-for-the-garden-in-flat-style-signs-and-symbols-of-gardening-garden-tools-in-the-ba.jpg',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
        paddingTop:75,
    },
    img: {
        height: 400,
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
        <div className={classes.root} styles={{borderRight: '1px solid black', paddingLeft:'10px', paddingRight:'10px'}}>
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