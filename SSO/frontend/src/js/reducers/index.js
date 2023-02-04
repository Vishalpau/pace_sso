import {
    SNACKBAR_MESSAGE,
    SNACKBAR_HIDE
} from "../actions";

const initialState = {
    snackBarMessage: null,
    snackBarVisible: false
};

export default function UiReducer(state = initialState, action) {
    switch (action.type) {
        case SNACKBAR_MESSAGE:
            return Object.assign({}, state, {
                snackBarMessage: action.message,
                snackBarVisible: true
            });
        case SNACKBAR_HIDE:
            return Object.assign({}, state, {
                snackBarMessages: '',
                snackBarVisible: false
            });
        default:
            return state;
    }
}