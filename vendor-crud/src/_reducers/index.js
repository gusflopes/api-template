import { combineReducers } from 'redux';
import { authentication } from './auth.reducer';
import { vendor } from './vendor.reducer';
import { task } from './task.reducer';
import { process } from './process.reducer';

const rootReducer = combineReducers({
    authentication,
    vendor,
    task,
    process
});
export default rootReducer;