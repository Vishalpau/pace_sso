
export const SNACKBAR = {
    open: {
        success: 'SNACKBAR_OPEN_SUCCESS',
    },
    close: {
        success: 'SNACKBAR_CLOSE_SUCCESS',
    },
    loadLoader: {
        succcess: 'SNACKBAR_LOAD_SUCCESS'
    },
    closeLoader: {
        succcess: 'SNACKBAR_Close_SUCCESS'
    }

};

export class SnackbarActions {
    constructor(dispatch) {
        this.dispatch = dispatch;
        this.open = this.openSnackbar.bind(this);
        this.close = this.closeSnackbar.bind(this);
        this.loadLoader = this.loadLoader.bind(this);
        this.closeLoader = this.closeLoader.bind(this);
    }
    openSnackbar(message) {
        // alert(message);
        return this.dispatch({ type: "type" });

    }
    closeSnackbar() {
        return this.dispatch({ type: "type" });
    }
    loadLoader() {
        return this.dispatch()
    }
    closeLoader() {
        return this.dispatch()
    }

}
