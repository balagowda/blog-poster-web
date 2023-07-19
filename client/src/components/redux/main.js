import {combineReducers} from 'redux';
import { loginAccountReducer, logoutAccountReducer } from './Reducers/accountReducer';

const rootReducer = combineReducers({
    getAccountData:loginAccountReducer,
    deleteAccountData:logoutAccountReducer
});

export default rootReducer;