// combine reducers go here
import {combineReducers} from 'redux';
import app from './components/app/reducers';

const rootReducer = combineReducers({
    app
});

export default rootReducer;