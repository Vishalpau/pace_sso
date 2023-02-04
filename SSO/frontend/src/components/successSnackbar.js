import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
// import { clearSnackbar } from "../../store/actions/snackbarActions";
import { UserActions } from "../js/user/UserActions";
import { mergeClasses } from '@material-ui/styles';
import "../../src/App.css";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}




class SuccessSnackbar extends React.Component {

    constructor(props) {
        super(props);
        // console.log({ props: this })
        this.action = new UserActions(this.props.dispatch);
        this.closeSnackbar = this.action.closeSnackbar.bind(this);

        // console.log({ props: this.props })
    }



    handleClose() {
        console.log({ thisobject: this })
        console.log({ props: props })
        this.this.action.closeSnackbar()
    }
    render() {
        // alert(this.props.user.error)
        // console.log('error status: '+this.props.user.error)
        return (
            <Snackbar
                open={this.props.user.open}
                autoHideDuration={5000}
                onClose={this.action.closeSnackbar.bind(this.action)}
                anchorOrigin={{
                    vertical: 'middle',
                    horizontal: 'right',
                }}
                className="snackbarAlertBox"
            >
                <Alert severity={this.props.user.error?"error":"success"}>
                    {this.props.user.message}
                </Alert>
            </Snackbar >
        );
    }
}

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuccessSnackbar);