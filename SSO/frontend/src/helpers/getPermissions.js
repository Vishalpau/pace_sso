var checkPermissions = function(permission='') {
    return false;
    console.log({app: localStorage.getItem('app')})
    var allPermissions = JSON.parse(localStorage.getItem('permissions'))
    console.log({beforeallPermissions: allPermissions})
    if(allPermissions != undefined){
        allPermissions = JSON.parse(localStorage.getItem('permissions'))
        console.log({allPermissions: allPermissions})
        if(allPermissions.includes(permission) || permission == ''){
            return false;
        }
        else{
            return true;
        }
    }
    
    
}

// export default {
//     getPermissions
// };


// export const getPermissions = (url) => {
//     return (
//       true
//     );
// }



export default (permission = '') =>
    checkPermissions(permission)