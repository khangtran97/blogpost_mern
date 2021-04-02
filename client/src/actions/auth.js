import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in the user
    const { data } = await api.sigIn(formData);

    dispatch({ type: AUTH, payload: data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.sigUp(formData);

    dispatch({ type: AUTH, payload: data });

    history.push('/');
  } catch (error) {
    console.log(error);
  }
};
