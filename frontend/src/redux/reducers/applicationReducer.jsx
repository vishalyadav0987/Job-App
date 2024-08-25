import { CLEAR_ERRORS, GET_ALL_APPLICATION_OF_APPLICANT_FAIL, GET_ALL_APPLICATION_OF_APPLICANT_REQUEST, GET_ALL_APPLICATION_OF_APPLICANT_SUCEESS, GET_ALL_APPLICATION_ON_JOB_FAIL, GET_ALL_APPLICATION_ON_JOB_REQUEST, GET_ALL_APPLICATION_ON_JOB_SUCEESS, UPDATE_JOB_STATUS_FAIL, UPDATE_JOB_STATUS_REQUEST, UPDATE_JOB_STATUS_RESET, UPDATE_JOB_STATUS_SUCEESS } from "../constants/applicationConstant";

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


const updateJobStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_JOB_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_JOB_STATUS_SUCEESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
                message: action.payload.message
            }

        case UPDATE_JOB_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_JOB_STATUS_RESET:
            return {
                ...state,
                isUpdated: false
            }


        case CLEAR_ERRORS:
            return {
                error: null,
                ...state,
            }


        default:
            return state;
    }
}


export { applicationReducer, updateJobStatusReducer };
