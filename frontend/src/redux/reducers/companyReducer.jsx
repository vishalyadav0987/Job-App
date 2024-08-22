import { CLEAR_ERRORS, CREATE_NEW_COMPANY_FAIL, CREATE_NEW_COMPANY_REQUEST, CREATE_NEW_COMPANY_RESET, CREATE_NEW_COMPANY_SUCEESS } from "../constants/companyConstant";

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

export { companyReducer }