import emailReducer from './emailReducer';
import photourlReducer from './photourlReducer';
import uidReducer from './uidReducer';
import usernameReducer from './usernameReducer';
import {combineReducers} from 'redux';

const userReducer = combineReducers({
    emailReducer,
    photourlReducer,
    uidReducer,
    usernameReducer
})

export default userReducer;