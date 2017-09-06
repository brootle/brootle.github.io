import { combineReducers } from 'redux';

import recentLeaders from './recentLeaders';
import allTimeLeaders from './allTimeLeaders';

const rootReducer = combineReducers({
    recentLeaders,
    allTimeLeaders
})

export default rootReducer;