export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const IS_ACCESS_TOKEN = "IS_ACCESS_TOKEN";
export const SIGNUP_SCREEN_SUCCESS = "SIGNUP_SCREEN_SUCCESS";
export const SIGNUP_SCREEN_FAIL = "SIGNUP_SCREEN_FAIL";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAIL = "PROFILE_FAIL";


const BASE_URL = 'https://kate.nvinfobase.com/api';

export const isAccessToken = (value) =>{
    // console.log('offline status action called')
    return {
        type: IS_ACCESS_TOKEN,
        payload: value
    }
}


export const loginApi = data => {
  return async dispatch => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: data,
      redirect: 'follow',
    });
    let response = await res.json();
    // console.log(response);
    if (response.success == true) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: response,
      });
    }
    return response;
  };
};
 export const getRegistered = data => {
    return async dispatch => {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        body: data,
        redirect: 'follow',
      });
      let response = await res.json();
      if (response.success == true) {
        dispatch({
          type: SIGNUP_SCREEN_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: SIGNUP_SCREEN_FAIL,
          payload: response,
        });
      }
      return response;
    };
  };

  export const getUserProfile = token => {
    console.log('token value is the',token)
    return async dispatch => {
      const res = await fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        // body: '',
        redirect: 'follow',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      let response = await res.json();
      console.log("Response for the profile api new responses ",JSON.stringify(response));
      if (response.status == true) {
        dispatch({
          type: PROFILE_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: PROFILE_FAIL,
          payload: response,
        });
      }
      return response
    };
  };
  export const forgetPassword = (data) => {
    var result = [];
    return async dispatch => {
        const res = await fetch(`${BASE_URL}/forgot`, {
            method: "POST",
            body: data,
            redirect: 'follow'
        })
        let response = await res.json();
  
        return response;
    }
  }