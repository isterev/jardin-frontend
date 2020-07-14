import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import MUIRichTextEditor from 'mui-rte';
import FormHelperText from "@material-ui/core/FormHelperText";


const styles = (theme) => ({

});

class MUIRichTextEditorInput extends React.Component {

    constructor(props) {
        super(props);

        this.onSave = this.onSave.bind(this)
    }

    onSave(data) {
        this.props.form.setFieldValue(this.props.field.name, JSON.stringify(data))
        // this.props.form.submitForm()
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>

                <MUIRichTextEditor
                    label="Type something here..."
                    inlineToolbar={true}
                    defaultValue = {this.props.field.value}
                    {...this.props} onSave={this.onSave}/>

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

export default withStyles(styles)(MUIRichTextEditorInput);