import { SIGNINEMAIL, SIGNOUT } from '../actions/authActions';

function emailReducer (state = {email: null}, action) {
    switch (action.type) {
        case SIGNINEMAIL:
            return {...state, email: action.email};
        case SIGNOUT:
            return {...state, email: null};
        default:
            return {...state};
    }
};

export default emailReducer;
