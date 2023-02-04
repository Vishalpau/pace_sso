import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { withFormik } from "formik";
import * as Yup from 'yup';
import { withStyles } from "@material-ui/core";


const styles = () => ({
    input: {
        display: 'none',
    },
})

const categoryTypes = [
    {
        value: 'asset',
        label: 'Asset',
    },
    {
        value: 'liecense',
        label: 'Liecense',
    },
    {
        value: 'accessory',
        label: 'Accessory',
    },

];



const AddUser = (props) => {

    // const classes = useStyles();

    const handleClose = () => {

        props.onClose({ open: false })
    };


    const {
        classes,
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
    } = props;



    const [categoryType, updatedCategoryType] = React.useState('asset');



    return (
        <div>

            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {/* {props.open} */}
                <DialogTitle id="form-dialog-title" >Add New Category</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>


                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={values.name}
                            label="Category Name"
                            helperText={touched.name ? errors.name : ""}
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                        />


                        <TextField
                            id="category_type"
                            select
                            label="Select Category Type"
                            value={categoryType}
                            onChange={handleChange}
                            helperText="Please select type of category"
                            fullWidth
                            name="category_type"
                        >
                            {categoryTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>



                        <input accept="image/*" name="cateory_image" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" className={classes.button} component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
          </Button>
                        <Button type="submit" color="primary">
                            Add Category
          </Button>

                    </DialogActions>
                </form>
            </Dialog>

        </div>
    );
};

const adduser = withFormik({

    mapPropsToValues: ({
        name,
        category_type
    }) => {
        return {
            name: name || "",
            category_type: category_type || "",
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("category field is Required"),
        category_type: Yup.string().required("Select your course category"),

    }),

    handleSubmit: (values, { props }) => {
        // console.log({ 'formikBag': formikBag })
        // console.log({ 'addCategory': addCategory })

        axios({
            url: '/assets/categories/',
            method: 'POST',
            data: {
                name: values.name,
                category_type: values.category_type,
                depreciation_id: 2
            }
        }).then((res) => {
            console.log({ 'success': res })
            props.onClose()

        }).catch((err) => {
            console.log(err)
            // this.setState({ loading: false })
            // if (err.response && err.response.status == 400) {
            //     var errorKeys = _.keys(err.response.data.errors)
            //     console.log(errorKeys)
            //     errorKeys.forEach(element => {
            //         var message = element + ': ' + err.response.data.errors[element][0]
            //         // display the message in the material snacker
            //     });
            // }
        })

    },
    // displayName: addcategory
})(AddUser);

export default withStyles(styles)(adduser);