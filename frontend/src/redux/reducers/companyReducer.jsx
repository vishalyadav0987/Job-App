import { CLEAR_ERRORS, CREATE_NEW_COMPANY_FAIL, CREATE_NEW_COMPANY_REQUEST, CREATE_NEW_COMPANY_RESET, CREATE_NEW_COMPANY_SUCEESS, GET_ALL_COMPANY_FAIL, GET_ALL_COMPANY_REQUEST, GET_ALL_COMPANY_SUCEESS, GET_COMPANY_DETAILS_FAIL, GET_COMPANY_DETAILS_REQUEST, GET_COMPANY_DETAILS_SUCEESS, UPDATE_COMPANY_DETAILS_FAIL, UPDATE_COMPANY_DETAILS_REQUEST, UPDATE_COMPANY_DETAILS_RESET, UPDATE_COMPANY_DETAILS_SUCEESS } from "../constants/companyConstant";

const companyReducer = (state = { company: {} }, action) => {
    switch (action.type) {
        case CREATE_NEW_COMPANY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CREATE_NEW_COMPANY_SUCEESS:
            return {
                loading: false,
                success: action.payload.success,
                company: action.payload.data,
                message: action.payload.message,
            }
        case CREATE_NEW_COMPANY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CREATE_NEW_COMPANY_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}

const updateCompanyReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_COMPANY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_COMPANY_DETAILS_SUCEESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                message: action.payload.message,
            }
        case UPDATE_COMPANY_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_COMPANY_DETAILS_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}


const singalCompanyReducer = (state = { company: {} }, action) => {
    switch (action.type) {
        case GET_COMPANY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_COMPANY_DETAILS_SUCEESS:
            return {
                loading: false,
                company: action.payload.data,
            }
        case GET_COMPANY_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}

const getAllCompany = (state = { companies: [] }, action) => {
    switch (action.type) {
        case GET_ALL_COMPANY_REQUEST:
            return {
                loading: false,
                companies: [],
            }
        case GET_ALL_COMPANY_SUCEESS:
            return {
                loading: false,
                companies: action.payload.data,
            }
        case GET_ALL_COMPANY_FAIL:
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

export { companyReducer, updateCompanyReducer, singalCompanyReducer, getAllCompany }