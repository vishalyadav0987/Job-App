import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyJobReducer, profileReducer, userReducer } from './redux/reducers/userReducer';
import { jobReducer, getAllJobs, updateJobDetaailsReducer, sessionReducer } from './redux/reducers/jobReducer';
import { companyReducer, getAllCompany, singalCompanyReducer, updateCompanyReducer } from './redux/reducers/companyReducer';
import { applicationReducer, updateJobStatusReducer } from './redux/reducers/applicationReducer';

const reducer = combineReducers({
    user: userReducer,
    newJob: jobReducer,
    updateProfile: profileReducer,
    newCompany: companyReducer,
    updateCompany: updateCompanyReducer,
    singalCompanyById: singalCompanyReducer,
    getAllCompany,
    adminAllJobs: getAllJobs,
    updateJobDetails: updateJobDetaailsReducer,
    jobApplication: applyJobReducer,
    application: applicationReducer,
    updateJobStatus: updateJobStatusReducer,
    queryForSearch:sessionReducer,
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)),
)

export default store;