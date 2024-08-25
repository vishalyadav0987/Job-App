import { CLEAR_ERRORS, GET_ALL_APPLICATION_OF_APPLICANT_FAIL, GET_ALL_APPLICATION_OF_APPLICANT_REQUEST, GET_ALL_APPLICATION_OF_APPLICANT_SUCEESS } from "../constants/applicationConstant";

const applicationReducer = (state = { applications: [] }, action) => {
    switch (action.type) {
        case GET_ALL_APPLICATION_OF_APPLICANT_REQUEST:
            return {
                applications: [],
                loading: true,
            }
        case GET_ALL_APPLICATION_OF_APPLICANT_SUCEESS:
            return {
                loading: false,
                applications: action.payload.data,
            }
        case GET_ALL_APPLICATION_OF_APPLICANT_FAIL:
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
