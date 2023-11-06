export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";
export const IS_ACCESS_TOKEN = "IS_ACCESS_TOKEN";
export const USER_GOALS_SUCCESS = "USER_GOALS_SUCCESS";
export const USER_GOALS_FAIL = "USER_GOALS_FAIL";
export const ADD_GOAL_SUCCESS = "ADD_GOAL_SUCCESS";
export const ADD_GOAL_FAIL = "ADD_GOAL_FAIL";
export const DELETE_GOAL_SUCCESS = "DELETE_GOAL_SUCCESS";
export const DELETE_GOAL_FAIL = "DELETE_GOAL_FAIL";
export const USER_NOTES_SUCCESS = "USER_NOTES_SUCCESS";
export const USER_NOTES_FAIL = "USER_NOTES_FAIL";
export const GET_NOTES_SUCCESS = "GET_NOTES_SUCCESS";
export const GET_NOTES_FAIL = "GET_NOTES_FAIL";
export const GET_NOTES_BY_ID_SUCCESS = "GET_NOTES_BY_ID_SUCCESS";
export const GET_NOTES_BY_ID_FAIL = "GET_NOTES_BY_ID_FAIL";
export const GET_SYMPTOM_SUCCESS = "GET_SYMPTOM_SUCCESS";
export const GET_SYMPTOM_FAIL = "GET_SYMPTOM_FAIL";
export const GET_CALENDER_SUCCESS = "GET_CALENDER_SUCCESS";
export const GET_CALENDAR_FAIL = "GET_CALENDAR_FAIL";
export const SYMPTOM_WITH_RATTING_S = "SYMPTOM_WITHRATTING_S";
export const SYMPTOM_WITH_RATTING_F = "SYMPTOM_WITHRATTING_F";
export const GET_HOMEWORK_SUCCESS = "GET_HOMEWORK_SUCCESS";
export const GET_HOMEWORK_FAIL = "GET_HOMEWORK_FAIL";
export const GET_TRACKED_SYMPTOPMS_SUCCESS = "GET_TRACKED_SYMPTOPMS_SUCCESS";
export const GET_TRACKED_SYMPTOPMS_FAIL = "GET_TRACKED_SYMPTOPMS_FAIL";
export const GET_TRACKING_SUCCESS = "GET_TRACKING_SUCCESS";
export const GET_TRACKING_FAIL = "GET_TRACKING_FAIL";
export const IS_LOGGED_OUT = "IS_LOGGED_OUT";
export const USER_STATUS = 'USER_STATUS'
export const REDEEMCOUPON_SUCCESS = 'REDEEMCOUPON_SUCCESS'
export const REDEEMCOUPON_FAIL = 'REDEEMCOUPON_FAIL'


const BASE_URL = 'https://kate.nvinfobase.com/api';
export const isUserLoggedOut = (value) =>{
    // console.log('offline status action called')
    return {
        type: IS_LOGGED_OUT,
        payload: value
    }
  }
  export const AfterTwoweeksstatus = (value) =>{
    // console.log('offline status action called')
    return {
        type: USER_STATUS,
        payload: value
    }
  }
export const updateProfile = (token, name, email, image) => {
    // console.log("sdgsdsdsdfsdfsdfs", alternateLicensePlates);
    var result = [];
    // alert(token)
    return async dispatch => {
        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        // formdata.append("phone_number", phoneNumber);

        if (image) {
            formdata.append("image", { uri: image?.uri, name: image?.fileName, type: image?.type });
        }
        const res = await fetch(`${BASE_URL}/update_profile`, {
            method: "POST",
            body: formdata,
            headers: {
                "Accept": "application/json",
                "Content-Type": 'multipart/form-data',
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value ==update", response)
        if (response) {
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: response
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}
export const addingGoals = (goal, token) => {
    var result = [];
    // alert(token)
    return async dispatch => {
        var formdata = new FormData();
        formdata.append("title", goal);
        const res = await fetch(`${BASE_URL}/goal`, {
            method: "POST",
            body: formdata,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value userGoals==>>>", response)
        // if (response.success == true) {
        //     dispatch({
        //         type: ADD_GOAL_SUCCESS,
        //         payload: response
        //     });
        //     // await AsyncStorage.setItem("Tokan",response.tokan)
        // } else {
        //     dispatch({
        //         type: ADD_GOAL_FAIL,
        //         payload: response.data.status
        //     });
        // }
        return response;
    }
}
export const deletingGoal = (goalId, token) => {
    var result = [];
    // alert(goalId)
    return async dispatch => {
        // var formdata = new FormData();
        // formdata.append("title", goal);
        const res = await fetch(`${BASE_URL}/goal/${goalId}`, {
            method: "DELETE",
            // body:formdata,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value userGoals==>>>", response)
        if (response.success == true) {
            dispatch({
                type: DELETE_GOAL_SUCCESS,
                payload: response
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: DELETE_GOAL_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}
export const redeemCoupon = (couponId,token) => {
 
    return async dispatch => {  
        const res = await fetch(`${BASE_URL}/applyCoupon/${couponId}`, {
            method: "GET",
            // body:formdata,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("redeemcoupon are theeee", response)
        if (response.success == true) {
            dispatch({
                type: REDEEMCOUPON_SUCCESS,
                payload: response
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: REDEEMCOUPON_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}
export const deletesubscription = (token) => {
   return async dispatch => {
        const res = await fetch(`${BASE_URL}/cancel_subscription`, {
            method: "GET",
            // body:formdata,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value userGoals==>>>", response)
       
        return response;
    }
}
export const getUserGoals = (token) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/goal`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        // console.log("response value userGoals==>>>", response)
        if (response.success == true) {
            dispatch({
                type: USER_GOALS_SUCCESS,
                payload: response.data
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: USER_GOALS_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}


export const getUserNotes = (token) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/note`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        // console.log("response value userNotes==>>>", response)
        if (response.success == true) {
            dispatch({
                type: GET_NOTES_SUCCESS,
                payload: response.data
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: GET_NOTES_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}


export const postUserNotes = (token, data) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/note`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        // console.log("response value userNotes==>>>", response)
        if (response.success == true) {
            dispatch({
                type: USER_NOTES_SUCCESS,
                payload: response.data
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: USER_NOTES_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}
export const updatingNote = (token, data, noteId) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/note/${noteId}`, {
            method: "PATCH",
            body: data,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
        let response = await res.json();
        return response;
    }
}
export const deleteNotesById = (token, noteId) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/note/${noteId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        let response = await res.json();
        return response;
    }
}
export const getUserNotesById = (token, notesId) => {
    console.log(notesId, "uuuuuuuuuuuuu");
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/note/${notesId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value userNotesById=====>>>", response)
        if (response.success == true) {
            dispatch({
                type: GET_NOTES_BY_ID_SUCCESS,
                payload: response.data
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: GET_NOTES_BY_ID_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}
export const addingSymptoms = (text, token) => {
    var result = [];
    // alert(token)
    return async dispatch => {
        var formdata = new FormData();
        formdata.append("title", text);
        const res = await fetch(`${BASE_URL}/symptom`, {
            method: "POST",
            body: formdata,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value usersymptom==>>>", response)
        return response;
    }
}
export const getUserSymptoms = (token) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/symptom`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        // console.log("response value userNotes==>>>", response)
        if (response.success == true) {
            dispatch({
                type: GET_SYMPTOM_SUCCESS,
                payload: response.data
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: GET_SYMPTOM_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}
export const PostSymptomsDetail = (token, data) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/symptom_tracking`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();

        return response;
    }
}
export const PostGoalsDetail = (token, data) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/goal_tracking`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();

        return response;
    }
}
export const changeUserPassword = (token, data) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/change_password`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();

        return response;
    }
}

export const eventCellCalender = (token, data) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/event`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        return response;
    }
}

export const getCalendarData = (token) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/event`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        if (response.status == true) {
            dispatch({
                type: GET_CALENDER_SUCCESS,
                payload: response.data
            });
        } else {
            dispatch({
                type: GET_CALENDAR_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}
export const updateCalendarEvent = (token, data,id) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/event/${id}`, {
            method: "PATCH",
            body: data,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
        let response = await res.json();
        return response;
    }
}
export const deleteCalendarEvent = (token, id) => {
    var result = [];
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/event/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        let response = await res.json();
        return response;
    }
}
export const PostHomework = (token, data) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/homework`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();

        return response;
    }
}

export const getUserHomeWork = (token) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/homework`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        // console.log("response value GET_HOMEWORK_SUCCESS=====>>>", response)
        if (response.success == true) {
            dispatch({
                type: GET_HOMEWORK_SUCCESS,
                payload: response.data
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: GET_HOMEWORK_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}
export const updateHomeWork = (token, data,id) => {
    // console.log(data,"datatatatatatatttatatttataattatatatatatatatatata");
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/updatehomework/${id}`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        let response = await res.json();
        return response;
    }
}
export const deleteHomework = (token, id) => {
    var result = [];
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/homework/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        let response = await res.json();
        return response;
    }
}

export const getSymptomToTrack = (token,data,id) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/symptom_tracking_by_date/${id}`, {
            method: "POST",
            body:data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value GET_HOMEWORK_SUCCESS=====>>>", response)
        return response;
    }
}
export const getGoalsToTrack = (token,data,id) => {
    var result = [];
    return async dispatch => {  
        const res = await fetch(`${BASE_URL}/goal_tracking_by_date/${id}`, {
            method: "POST",
            body:data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value GET_HOMEWORK_SUCCESS=====>>>", response)
        return response;
    }
}
export const postUserTrackingRecords = (token, data) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/tracking`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value Trcking Records==>>>", response)
        return response;
    }
}
export const postUserNotificationData = (token, data) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/notification`, {
            method: "POST",
            body: data,
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        console.log("response value notification_by_date_time==>>>", response)
        return response;
    }
}
export const getUserTrackingRecords = (token) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/tracking`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        // console.log("response value userNotes==>>>", response)
        if (response.success == true) {
            dispatch({
                type: GET_TRACKING_SUCCESS,
                payload: response.data
            });
            // await AsyncStorage.setItem("Tokan",response.tokan)
        } else {
            dispatch({
                type: GET_TRACKING_FAIL,
                payload: response.data
            });
        }
        return response;
    }
}


export const updatingTrackingRecords = (token, data, recordId) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/tracking/${recordId}`, {
            method: "PATCH",
            body: data,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
        let response = await res.json();
        return response;
    }
}
export const deleteTrackingRecords = (token, recordId) => {
    var result = [];
    // alert(token)
    return async dispatch => {

        const res = await fetch(`${BASE_URL}/tracking/${recordId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        let response = await res.json();
        return response;
    }
}

export const getUserNotificationData = (token,date,time) => {
    var result = [];
    // alert(token)
    return async dispatch => {
        console.log(`${BASE_URL}/notification_by_date_time/${date}/${time}`)

        const res = await fetch(`${BASE_URL}/notification_by_date_time/${date}/${time}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        let response = await res.json();
        // console.log("response value userNotes==>>>", response)
        return response;
    }
}
