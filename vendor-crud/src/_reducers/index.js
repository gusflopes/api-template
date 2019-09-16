import { combineReducers } from 'redux';
import { authentication } from './auth.reducer';
import { vendor } from './vendor.reducer';
import { task } from './task.reducer';

const rootReducer = combineReducers({
    authentication,
    vendor,
    task
});
export default rootReducer;