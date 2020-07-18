import React from "react"

import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"

import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import blue from "@material-ui/core/colors/blue"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"

import withStyles from "@material-ui/core/styles/withStyles"
import FormHelperText from "@material-ui/core/FormHelperText"


const styles = (theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 250,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    card: {
        position: 'absolute',
        top: '33px'
    },
    input: {
        display: "none"
    },
    button: {
        color: blue[900],
        margin: 10
    },
    media: {
        maxWidth: '300px',
        maxHeight: '300px'
    },
})

class ImageUploadCard extends React.Component {

    constructor(props) {
        super(props)

        if (this.props.field.value)
            this.state = {
                selectedFile: this.props.field.value,
                loaded: true
            }
        else
            this.state = {
                selectedFile: null,
                loaded: false
            }

        this.handleUpload = this.handleUpload.bind(this)
        this.imageReset = this.imageReset.bind(this)
    }


    handleUpload(event) {

        const file = event.target.files[0]

        let size = 10485760
        if (file.size > size) {
            this.props.form.setFieldError(this.props.field.name, "File size is too large!");
        }

        const reader = new FileReader()

        reader.onloadend = function (e) {
            this.setState({
                selectedFile: reader.result,
                loaded: true
            })

            this.props.form.setFieldValue(this.props.field.name, reader.result)

        }.bind(this)

        const url = reader.readAsDataURL(file)
    }

    imageReset() {
        this.setState({
            selectedFile: null,
            loaded: false
        })

        this.props.form.setFieldValue(this.props.field.name, null)
    }

    renderInitialState() {
        const {classes} = this.props

        return (
            <React.Fragment>
                <CardContent>
                    <Grid container>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            type="file"
                            onChange={this.handleUpload}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon/>
                            </Fab>
                        </label>
                        {
                            this.props.form.touched[this.props.field.name] &&
                            this.props.form.errors[this.props.field.name] &&

                            <FormHelperText error={true}>
                                {this.props.form.errors[this.props.field.name]}
                            </FormHelperText>
                        }

                    </Grid>
                </CardContent>
            </React.Fragment>
        )
    }

    renderUploadedState() {
        const {classes} = this.props
        return (
            <React.Fragment>
                <CardActionArea onClick={this.imageReset}>
                    <img
                        alt="Image not specified"
                        className={classes.media}
                        src={this.state.selectedFile}
                    />
                </CardActionArea>
            </React.Fragment>
        )
    }

    render() {
        const {classes} = this.props

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Card className={classes.card}>

                        {this.state.loaded ? this.renderUploadedState() : this.renderInitialState()}

                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ImageUploadCard)
