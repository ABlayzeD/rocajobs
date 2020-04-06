import { SIGNINEMAIL, SIGNOUT } from '../actions/authActions';

function emailReducer (state = {email: null}, action) {
    console.log(action.email);
    switch (action.type) {
        case SIGNINEMAIL:
            return Object.assign({}, state, {
                email: action.email
            })
        case SIGNOUT:
            return {...state, email: null};
        default:
            return {...state};
    }
};

export default emailReducer;
