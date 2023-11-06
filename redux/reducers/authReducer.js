import { LOGIN_FAIL, LOGIN_SUCCESS,IS_ACCESS_TOKEN ,SIGNUP_SCREEN_SUCCESS,SIGNUP_SCREEN_FAIL,PROFILE_SUCCESS,PROFILE_FAIL} from '../actions/authAction'

const intialState = {
    user: [],
    accessToken:"",
    subscriptionDetail:[],
    adminSymptoms:[],
    promocode:[]
}

export default function (state = intialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state, user: action.payload.user_details,accessToken:action.payload.token,
                subscriptionDetail:action.payload.subscription,
                adminSymptoms:action.payload.adminsymptom[0]?.symptom,promocode:action.payload.promocode
            }

        case LOGIN_FAIL:
            return {
                ...state, error: action.payload
            }
        case PROFILE_SUCCESS:
                return {
                    ...state, user: action.payload.user,
                    subscriptionDetail:action.payload.subscription,
                    adminSymptoms:action.payload.adminsymptom[0]?.symptom,
                    promocode: action.payload.promocode
                }
        case PROFILE_FAIL:
                return {
                    ...state, error: action.payload
                }    
        case SIGNUP_SCREEN_SUCCESS:
                return {
                    ...state, user: action.payload
                }
    
        case SIGNUP_SCREEN_FAIL:
                return {
                    ...state, error: action.payload
                }    
        case IS_ACCESS_TOKEN:
            return{
                ...state,accessToken:action.payload
            }    
    }
    return state;
}