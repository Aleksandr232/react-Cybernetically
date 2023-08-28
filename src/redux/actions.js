import axios from 'axios';

// Action Types
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Action Creators
export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error
  };
};

// Async Action Creator
export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    axios.get('https://api.iex.cloud/v1/tops/last?token=sk_4384cec44e684de4b82ba2e2d39b2336')
      .then(response => {
        const data = response.data;
        dispatch(fetchDataSuccess(data));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchDataFailure(errorMessage));
      });
  };
};