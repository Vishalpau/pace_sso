/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers.
 */
require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page.
 */
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Template from './template';
import theme from './theme';
import userReducer from './user/reducer';
import snackbarReducer from './reducers/uiReducer'
import registerServiceWorker from './registerServiceWorker';
import SuccessSnackbar from '../components/successSnackbar.js';
import PaceLoader from './user/auth/PaceLoader';
const store = createStore(
	userReducer,
	// snackbarReducer
);

ReactDOM.render(
	<Provider store={store} theme={theme} >
		<ThemeProvider theme={theme}>	
			<SuccessSnackbar />
			{/* <PaceLoader autoHideDuration={3000}/> */}
			<Template />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
)

registerServiceWorker()
