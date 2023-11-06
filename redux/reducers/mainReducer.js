import {
    ADD_GOAL_SUCCESS, ADD_GOAL_FAIL, IS_ACCESS_TOKEN, USER_GOALS_SUCCESS, USER_GOALS_FAIL,
    DELETE_GOAL_FAIL, DELETE_GOAL_SUCCESS, USER_NOTES_SUCCESS, USER_NOTES_FAIL, GET_NOTES_FAIL, GET_NOTES_SUCCESS,
    GET_NOTES_BY_ID_SUCCESS, GET_NOTES_BY_ID_FAIL, GET_SYMPTOM_SUCCESS, GET_SYMPTOM_FAIL, GET_CALENDAR_FAIL,
    GET_CALENDER_SUCCESS, GET_HOMEWORK_SUCCESS, GET_HOMEWORK_FAIL, GET_TRACKED_SYMPTOPMS_FAIL,
    GET_TRACKED_SYMPTOPMS_SUCCESS, GET_TRACKING_SUCCESS, GET_TRACKING_FAIL,
    IS_LOGGED_OUT, USER_STATUS,REDEEMCOUPON_FAIL,REDEEMCOUPON_SUCCESS
} from '../actions/mainAction'

const intialState = {
    user: {},
    accessToken: "yes",
    userGoals: [],
    addingGoals: [],
    deleteGoal: [],
    postUserNotes: [],
    userNotesList: [],
    notesById: [],
    userSymptomList: [],
    calendarData: [],
    homeWorkList: [],
    graphSymptomList: [],
    trackingRecords: [],
    userAction: "",
    activestatus: '',
    redeemStatus:''
}

export default function (state = intialState, action) {
    switch (action.type) {
        case USER_GOALS_SUCCESS:
            return {
                ...state, userGoals: action.payload
            }

        case USER_GOALS_FAIL:
            return {
                ...state, error: action.payload
            }
        case GET_TRACKING_SUCCESS:
            return {
                ...state, trackingRecords: action.payload
            }

        case GET_TRACKING_FAIL:
            return {
                ...state, error: action.payload
            }
        case ADD_GOAL_SUCCESS:
            return {
                ...state, addingGoals: action.payload
            }

        case ADD_GOAL_FAIL:
            return {
                ...state, error: action.payload
            }
        case DELETE_GOAL_SUCCESS:
            return {
                ...state, deleteGoal: action.payload
            }
        case DELETE_GOAL_FAIL:
            return {
                ...state, error: action.payload
            }
        case USER_NOTES_SUCCESS:
            return {
                ...state, postUserNotes: action.payload
            }
        case USER_NOTES_FAIL:
            return {
                ...state, error: action.payload
            }
        case GET_NOTES_SUCCESS:
            return {
                ...state, userNotesList: action.payload
            }
        case GET_NOTES_FAIL:
            return {
                ...state, error: action.payload
            }
        case GET_NOTES_BY_ID_SUCCESS:
            return {
                ...state, notesById: action.payload
            }
        case GET_NOTES_BY_ID_FAIL:
            return {
                ...state, error: action.payload
            }
        case GET_SYMPTOM_SUCCESS:
            return {
                ...state, userSymptomList: action.payload
            }
        case GET_SYMPTOM_FAIL:
            return {
                ...state, error: action.payload
            }
        case GET_CALENDER_SUCCESS:
            return {
                ...state, calendarData: action.payload
            }
        case GET_CALENDAR_FAIL:
            return {
                ...state, error: action.payload
            }
            case REDEEMCOUPON_SUCCESS:
                return {
                    ...state, redeemStatus: action.payload
                }
            case REDEEMCOUPON_FAIL :
                return {
                    ...state, error: action.payload
                }
        case GET_HOMEWORK_SUCCESS:
            return {
                ...state, homeWorkList: action.payload
            }
        case GET_HOMEWORK_FAIL:
            return {
                ...state, error: action.payload
            }
        case GET_TRACKED_SYMPTOPMS_SUCCESS:
            return {
                ...state, graphSymptomList: action.payload
            }
        case GET_TRACKED_SYMPTOPMS_FAIL:
            return {
                ...state, error: action.payload
            }
        case IS_LOGGED_OUT:
            return {
                ...state, userAction: action.payload
            }
        case USER_STATUS:
            return {
                ...state, activestatus: action.payload
            }
    }
    return state;
}