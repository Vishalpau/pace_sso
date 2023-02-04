export const SNACKBAR_MESSAGE = "SNACKBAR_MESSAGE";
export const SNACKBAR_HIDE = "SNACKBAR_HIDE";

export function showSnackBarMessage(message) {
    console.log('hit 1');
    return (dispatch, getState) => {
        console.log('hit 2');
        dispatch(hideSnackBar());
        dispatch({
            type: SNACKBAR_MESSAGE,
            message: message
        });
    }
}

export const hideSnackBar = () => {
    type: SNACKBAR_HIDE
};