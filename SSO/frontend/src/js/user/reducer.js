import { USER } from './UserActions';

const userDefault = {
    name: 'John Doe',
    logged: false,
    verified: false,
    subscription: 0,
    open: false,
    message: '',
    error: false
}

export default function (state = userDefault,action) {
    var user = Object.assign({}, state);
    console.log({action: action})
    switch (action.type) {
        case USER.login.success:
            console.log({loggedstatus:user})
            // user.avatar = action.data.user.avatar
            // user.name = action.data.user.name
            // user.email = action.data.user.email
            
            user.logged = true;
            // console.log({loggedstatusupdated:action.data.user.name})
            return user;
        case USER.update.success:
            // console.log({loggedstatus:user})
            // if(action.data.user.avatar)
            //     user.avatar = action.data.user.avatar
            // if(action.data.user.email)
            //     user.email = action.data.user.email
            // console.log({loggedstatusupdated:action.data.user.name})
            return user;
        case USER.verify.success:
            user.verified = true;
            user.logged = true; 
            return user;
        case USER.logout.success:
            user.logged = false;
            return user;
        case USER.verify.error:
            user.verified = true;
            return user;
        case USER.open.success:
            user.open = true;
            user.message = action.message;
            user.error=action.error;
            return user;
        case USER.close.success:
            user.open = false;
            return user;
        default:
            return user;
    }
}
