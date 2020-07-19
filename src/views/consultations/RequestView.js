import React from "react";
import FormikTimestampPicker from "../../components/consultations/FormikTimestampPicker";
import BreadCrumbsComponent from "../../components/consultations/BreadCrumbsComponent";
import {ErrorMessage, Form, Formik} from "formik";
import FormikSelect from "../../components/consultations/FormikSelect";
import FormikTextArea from "../../components/consultations/FormikTextArea";
import * as Yup from "yup"
import {makeStyles} from "@material-ui/core/styles";
import ExpertConsultationService from "../../services/ExpertConsultationService";
import FormikTextField from "../../components/consultations/FormikTextField";
import Paper from "@material-ui/core/Paper";
import AlertComponent from "../../components/consultations/AlertComponent";
import { useHistory } from "react-router-dom";
import Page from "../../components/Page";
import UserService from "../../services/UserService";
import {formatDateTimeString, getEarliestTime} from "../../components/util/ExpertUtils";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > *': {
            marginTop: theme.spacing(3),
            padding: theme.spacing(5),
            // paddingTop: theme.spacing(15)
        },
        width: '100%'
    },
    paper: {
        width: '100%',
        borderRadius: '10px',
    },
    formDiv: {
        marginTop: '30px',
        '& .MuiFormHelperText-root' : {
            color: '#b56244',
            fontSize: '12px'
        }
    },
    datePickerDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '900px'
    },
    queryDetailsDiv: {
        display: 'flex',
        marginTop: '50px',
        justifyContent: 'space-between',
        width: '900px'
    },

}))

function formattedEarliestTime() {
    let result = formatDateTimeString(getEarliestTime())
    return result.substring(0, result.length - 9)
}
function checkForWorkingHours(value) {
    if (value !== undefined) {
        return value.getHours() >= 10 && value.getHours() <= 19;
    }
    return true;
}
const expertRequestFormYupSchema = Yup.object({
    subject: Yup.string().required("Trust us, giving it a subject helps both you and us! ;)"),
    category: Yup.string().required("Required Field!"),
    description: Yup.string().required("Tell us something about your queries so we can be better prepared to assist you!"),
    firstPreference: Yup.date()
        .min(getEarliestTime(), "Oops, can't schedule before 10 am, " + formattedEarliestTime() + "!")
        .test('checkForWorkingHours', 'Oops, appointments available from 10 am - 7 pm', checkForWorkingHours),
    secondPreference: Yup.date().min(getEarliestTime(), "Oops, can't schedule before 10 am, " + formattedEarliestTime() + "!")
        .test('checkForWorkingHours', 'Oops, appointments available from 10 am - 7 pm', checkForWorkingHours),
    thirdPreference: Yup.date().min(getEarliestTime(), "Oops, can't schedule before 10 am, " + formattedEarliestTime() + "!")
        .test('checkForWorkingHours', 'Oops, appointments available from 10 am - 7 pm', checkForWorkingHours)
})

export default function() {
    let classes = useStyles();
    const topicMenuItems = [
        {label: 'Winter Garden', value:'WINTER_GARDEN'},
        {label: 'Summer Garden', value:'SUMMER_GARDEN'},
        {label: 'Autumn Garden', value:'AUTUMN_GARDEN'},
        {label: 'Spring Garden', value:'SPRING_GARDEN'},]
    const initialValues = {firstPreference: getEarliestTime(),
        secondPreference: getEarliestTime(),
        thirdPreference: getEarliestTime(),
        title:'',
        description:''}
    const history = useHistory();
    const handleSubmit = async (values) => {
        delete values['initialValues']
        values['createdOn'] = new Date(Date.now()).toISOString()
        values['creator'] = UserService.getCurrentUser()['id']
        values['status'] = 'CREATED'
        await ExpertConsultationService.createConsultationRequest(values)
        history.push({
            pathname: "/expert-consultation/my-requests"
        })
    }

    return (
        <Page>
             <div className={classes.root}>
             <Paper className={classes.paper}>
                 <BreadCrumbsComponent links={[{name: 'Expert Consultation', link: '/expert-consultation/request'}, {name: 'Request Consultation'}]}/>
                 <p>Tell us when you'd like to connect and some details about the topics you would like to discuss.</p>
                 <p style={{marginTop:'-10px'}}>Appointments are available from <b>{formatDateTimeString(getEarliestTime())}</b> onwards</p>
                 <p style={{marginTop:'-10px'}}>We look forward to speaking with you!</p>
                 <Formik
                    initialValues={{initialValues}}
                    onSubmit={handleSubmit}
                    validationSchema={expertRequestFormYupSchema}
                    >
                    {({dirty, isValid}) => {
                        return (
                            <Form className={classes.formDiv} id="requestForm">
                                <FormikTextField name="subject" label={"What do you want to talk about?"}/>
                                <div className={classes.datePickerDiv}>
                                    <FormikTimestampPicker name="firstPreference" label="First Preference"/>
                                    <FormikTimestampPicker name="secondPreference" label="Second Preference"/>
                                    <FormikTimestampPicker name="thirdPreference" label="Third Preference"/>
                                </div>
                                <div className={classes.queryDetailsDiv}>
                                    <FormikSelect label="Category" name="category" menuItems={topicMenuItems} error={<ErrorMessage name="topic"/>}/>
                                    <FormikTextArea label="Tell us more..." name="description" rows={10}/>
                                </div>
                                <div style={{display: 'flex', justifyContent:'flex-end', width: '900px'}}>
                                    <AlertComponent disabled={!isValid || !dirty} text="Request Consultation"/>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
             </Paper>
             </div>
        </Page>
    )
}