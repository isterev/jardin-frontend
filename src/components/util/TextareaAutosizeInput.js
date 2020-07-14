import React from "react";
import blue from "@material-ui/core/colors/blue";

import withStyles from "@material-ui/core/styles/withStyles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormHelperText from "@material-ui/core/FormHelperText";


const styles = (theme) => ({

});

class TextareaAutosizeInput extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.props.form.setFieldValue(this.props.field.name, event.target.value)
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>

                <TextareaAutosize {...this.props} onChange={this.onChange}/>
                {
                    this.props.form.touched[this.props.field.name] &&
                    this.props.form.errors[this.props.field.name] &&

                    <FormHelperText error={true}>
                        {this.props.form.errors[this.props.field.name]}
                    </FormHelperText>
                }
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TextareaAutosizeInput);