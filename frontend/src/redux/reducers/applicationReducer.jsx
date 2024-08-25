import { CLEAR_ERRORS, GET_ALL_APPLICATION_OF_APPLICANT_FAIL, GET_ALL_APPLICATION_OF_APPLICANT_REQUEST, GET_ALL_APPLICATION_OF_APPLICANT_SUCEESS, GET_ALL_APPLICATION_ON_JOB_FAIL, GET_ALL_APPLICATION_ON_JOB_REQUEST, GET_ALL_APPLICATION_ON_JOB_SUCEESS } from "../constants/applicationConstant";

const applicationReducer = (state = { applications: [] }, action) => {
    switch (action.type) {
        case GET_ALL_APPLICATION_OF_APPLICANT_REQUEST:
        case GET_ALL_APPLICATION_ON_JOB_REQUEST:
            return {
                applications: [],
                loading: true,
            }
        case GET_ALL_APPLICATION_OF_APPLICANT_SUCEESS:
        case GET_ALL_APPLICATION_ON_JOB_SUCEESS:
            return {
                loading: false,
                applications: action.payload.data,
            }
        case GET_ALL_APPLICATION_OF_APPLICANT_FAIL:
        case GET_ALL_APPLICATION_ON_JOB_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}



export { applicationReducer };
