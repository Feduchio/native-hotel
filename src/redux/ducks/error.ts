/* eslint-disable no-case-declarations */
import {
  call,
  put,
  all,
  takeLatest,
} from 'typed-redux-saga';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAlert, AsyncAlert } from '../../etc/erorAlert';
import {
  ErrorState, ErrorActions,
} from './errorTypes';
import { RootState } from '../store';
import { isIphone } from '../../constants/Layout';
import {
  dataToStore, retrieveData,
} from '../../etc/AsyncStorageManipulator';
import { LOGOUT_REQUEST } from './googleAccess';
import i18n from '../../localization/config';

export const prefix = 'error/';

/**
 * Constants
 * */
export const ERROR_REQUEST = `${prefix}ERROR_REQUEST` as const;
export const ERROR_START = `${prefix}ERROR_START` as const;
export const ERROR_SUCCESS = `${prefix}ERROR_SUCCESS` as const;
export const ERROR_ERROR = `${prefix}ERROR_ERROR` as const;

export const REFRESH_TOKEN_REQUEST = `${prefix}REFRESH_TOKEN_REQUEST` as const;
export const REFRESH_TOKEN_START = `${prefix}REFRESH_TOKEN_START` as const;
export const REFRESH_TOKEN_SUCCESS = `${prefix}REFRESH_TOKEN_SUCCESS` as const;
export const REFRESH_TOKEN_ERROR = `${prefix}REFRESH_TOKEN_ERROR` as const;

export const SIGN_IN_ERROR_REQUEST = `${prefix}SIGN_IN_ERROR_REQUEST` as const;
export const SIGN_IN_ERROR_START = `${prefix}SIGN_IN_ERROR_START` as const;
export const SIGN_IN_ERROR_SUCCESS = `${prefix}SIGN_IN_ERROR_SUCCESS` as const;
export const SIGN_IN_ERROR_ERROR = `${prefix}SIGN_IN_ERROR_ERROR` as const;

/**
 * Reducer
 * */
export const initialState: ErrorState = {
  loading: true,
  error: null,
};

export default function errorReducer(state = initialState, action: ErrorActions): ErrorState {
  switch (action.type) {
    case REFRESH_TOKEN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case REFRESH_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return { ...state };
  }
}

/**
 * Selectors
 * */
export const loadingSelector = (state: RootState) => state.errorReducer.loading;
export const errorSelector = (state: RootState) => state.errorReducer.error;

/**
 * Sagas
 */
export const refreshTokenSaga = function* ({ payload }: any) {
  yield put({
    type: REFRESH_TOKEN_START,
  });
  try {
    const accessToken = yield* call(retrieveData, 'accessToken');
    if (!isIphone) yield* call(GoogleSignin.clearCachedAccessToken, accessToken);
    const currentUser = yield* call(GoogleSignin.getTokens);
    yield call(dataToStore, 'accessToken', currentUser.accessToken);
    yield put({
      type: REFRESH_TOKEN_SUCCESS,
    });
    yield call(payload.saga, { payload: payload.sagaPayload });
  } catch (error: any) {
    console.log({ error });
    yield put({
      type: REFRESH_TOKEN_ERROR,
      payload: { saga: refreshTokenSaga, sagaPayload: payload },
      error,
    });
  }
};

export const signInSaga = function* ({ payload }: any) {
  yield put({
    type: SIGN_IN_ERROR_START,
  });
  try {
    yield* call(GoogleSignin.signInSilently);
    yield put({
      type: SIGN_IN_ERROR_SUCCESS,
    });
    yield call(payload.saga, { payload: payload.sagaPayload });
  } catch (error) {
    console.log(error);
    yield put({
      type: SIGN_IN_ERROR_ERROR,
      payload,
      error,
    });

    yield put({ type: LOGOUT_REQUEST });
  }
};

export type SetErrorRequest = {
  type: any,
  payload: any;
  error: any;
};

export const errorSaga = function* ({ error, payload }: SetErrorRequest) {
  console.log(error);

  yield put({
    type: ERROR_START,
  });
  // console.log('error?.response?.status', error?.response?.status);
  switch (true) {
    case (error?.response?.data?.error?.code === 401 && error?.response?.data?.error?.status === 'UNAUTHENTICATED'):
      yield put({
        type: REFRESH_TOKEN_REQUEST,
        payload,
      });
      break;
    case (error?.message === 'getTokens requires a user to be signed in'):
      yield put({
        type: SIGN_IN_ERROR_REQUEST,
        payload,
      });
      break;
    case (error?.code === '-5'):
    case (error?.message === 'Sign in action cancelled'):
    case (error?.message === 'Failed authentication recovery attempt, probably user-rejected.'):
      yield put({
        type: ERROR_SUCCESS,
        payload,
      });
      break;
    case (error?.response?.data?.error?.code === 503 || error?.response?.data?.error?.code === 500):
      const message = yield* call(AsyncAlert, i18n.t('gError'),
        i18n.t('gErrorDesc'), i18n.t('reconnect'));
      // console.log('message, message', message);
      if (message === 'OK') yield call(payload.saga, { payload: payload.sagaPayload });
      yield put({
        type: ERROR_SUCCESS,
        error,
      });
      break;
    default:
      yield call(getAlert, i18n.t('err'), i18n.t('errDesc'));
      yield put({
        type: ERROR_SUCCESS,
        error,
      });
      break;
  }
};

export function* saga() {
  yield all([
    takeLatest(REFRESH_TOKEN_REQUEST, refreshTokenSaga),
    takeLatest(SIGN_IN_ERROR_REQUEST, signInSaga),
    takeLatest(ERROR_REQUEST, errorSaga),
    takeLatest(REFRESH_TOKEN_ERROR, errorSaga),
  ]);
}
