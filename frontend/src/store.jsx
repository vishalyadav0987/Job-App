import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { profileReducer, userReducer } from './redux/reducers/userReducer';
import jobReducer from './redux/reducers/jobReducer';
import { companyReducer, getAllCompany, singalCompanyReducer, updateCompanyReducer } from './redux/reducers/companyReducer';

const reducer = combineReducers({
    user: userReducer,
    newJob: jobReducer,
    updateProfile: profileReducer,
    newCompany: companyReducer,
    updateCompany: updateCompanyReducer,
    singalCompanyById: singalCompanyReducer,
    getAllCompany,
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)),
)

export default store;