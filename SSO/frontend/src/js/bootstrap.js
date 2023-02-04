
window._ = require('lodash');

/**
 * Show message in the snacker with a timeout to disappear
 */
window.showSnack = function (message) {
    var x = document.getElementById("snacker")
    x.className = "show-snack";
    x.innerText = message
    setTimeout(function () { x.className = x.className.replace("show-snack", ""); }, 5000);
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Django back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = '/api/v1';
window.axios.defaults.headers.post['Content-Type'] = 'application/json';
window.axios.defaults.headers.common['Accept'] = 'application/json';

var token = localStorage.getItem('token');
token ? window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token : '';

// Add a 403 response interceptor
window.axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log({'error2':error})
    if (1103 === error.response.status_code || 1103=== error.response.data.status_code) {
        window.showSnack('Session timed out, redirecting to login in 3s')
        localStorage.removeItem('token')
        localStorage.removeItem('company')
        localStorage.clear()
        setTimeout(function () { window.location = `/login`; }, 3000)
    } 
    else if(401 === error.response.status || 401=== error.response.data.status_code){
        window.showSnack('You have been logged out, redirecting to login page')
        localStorage.removeItem('token')
        localStorage.removeItem('company')
        localStorage.clear()
        setTimeout(function () { window.location = `/login`; }, 1000)
    }
    else {
        return Promise.reject(error);
    }
});
