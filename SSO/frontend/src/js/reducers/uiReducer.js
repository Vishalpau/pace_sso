import { SNACKBAR } from './SnackbarActions';

const snackbarDefault = {
    open: false,
}

export default function (state = snackbarDefault, action) {
    var snackbar = Object.assign({}, state);
    switch (action.type) {
        case SNACKBAR.open.success:
            snackbar.open = true;
            return snackbar;
        case SNACKBAR.close.success:
            snackbar.open = true;
            return snackbar;
        case SNACKBAR.loadLoader.success:
            snackbar.loadLoader = true;
            return snackbar;
        case SNACKBAR.closeLoader.success:
            snackbar.closeLoader = true;
            return snackbar;

        default:
            return snackbar;
    }
}
