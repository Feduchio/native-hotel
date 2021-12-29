import {
  takeLatest, put, all, call,
  // select,
} from 'typed-redux-saga';
// import moment from 'moment';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleAccessState, GoogleAccessActions, CalendarSetRequestPayload, CalendarSetRequest, SetNewStatusPayload,
  MakeNewCalendarPayload, MakeNewCalendarRequest, CalendarsListItem, CalendarsList, CalendarItem,
} from './googleAccessTypes';
import { RootState } from '../store';
import apiService from '../../api';
import { isIphone } from '../../constants/Layout';
import { dataToStore, retrieveData, clearAsyncStorage } from '../../etc/AsyncStorageManipulator';
import { PRELOAD_BOOKING_REQUEST } from './bookings';
import { errorSaga } from './error';

export const prefix = 'googleAccess/';

/**
 * Constants
 * */
export const GET_ACCESS_REQUEST = `${prefix}GET_ACCESS_REQUEST` as const;
export const GET_ACCESS_START = `${prefix}GET_ACCESS_START` as const;
export const GET_ACCESS_SUCCESS = `${prefix}GET_ACCESS_SUCCESS` as const;
export const GET_ACCESS_ERROR = `${prefix}GET_ACCESS_ERROR` as const;

export const LOGOUT_REQUEST = `${prefix}LOGOUT_REQUEST` as const;
export const LOGOUT_START = `${prefix}LOGOUT_START` as const;
export const LOGOUT_SUCCESS = `${prefix}LOGOUT_SUCCESS` as const;
export const LOGOUT_ERROR = `${prefix}LOGOUT_ERROR` as const;

export const CALENDAR_SET_REQUEST = `${prefix}CALENDAR_SET_REQUEST` as const;
export const CALENDAR_SET_START = `${prefix}CALENDAR_SET_START` as const;
export const CALENDAR_SET_SUCCESS = `${prefix}CALENDAR_SET_SUCCESS` as const;
export const CALENDAR_SET_ERROR = `${prefix}CALENDAR_SET_ERROR` as const;

export const MAKE_NEW_CALENDAR_REQUEST = `${prefix}MAKE_NEW_CALENDAR_REQUEST` as const;
export const MAKE_NEW_CALENDAR_START = `${prefix}MAKE_NEW_CALENDAR_START` as const;
export const MAKE_NEW_CALENDAR_SUCCESS = `${prefix}MAKE_NEW_CALENDAR_SUCCESS` as const;
export const MAKE_NEW_CALENDAR_ERROR = `${prefix}MAKE_NEW_CALENDAR_ERROR` as const;

export const SET_NEW_STATUS = `${prefix}SET_NEW_STATUS` as const;

export const NEED_LOGIN = `${prefix}NEED_LOGIN` as const;
/**
 * Reducer
 * */
export const initialState: GoogleAccessState = {
  loading: false,
  isLogin: false,
  preloading: true,
  calendars: {
    items: [],
    total: 0,
  },
  status: '',
  userInfo: null,
};
export default function googleAccessReducer(state = initialState, action: GoogleAccessActions): GoogleAccessState {
  switch (action.type) {
    case MAKE_NEW_CALENDAR_START:
    case GET_ACCESS_START:
      return {
        ...state,
        loading: true,
      };
    case NEED_LOGIN:
      return {
        ...state,
        preloading: false,
      };
    case CALENDAR_SET_START:
      return {
        ...state,
        preloading: true,
      };
    case SET_NEW_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogin: false,
        calendars: {
          items: [],
          total: 0,
        },
        status: '',
        userInfo: null,
        preloading: false,
      };
    case GET_ACCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        calendars: action.payload.calendars,
        status: 'calendars',
        userInfo: action.payload.userInfo,
      };
    case MAKE_NEW_CALENDAR_SUCCESS:
    case CALENDAR_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogin: true,
        preloading: false,
        status: '',
      };
    case MAKE_NEW_CALENDAR_ERROR:
    case GET_ACCESS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
}

/**
 * Selectors
 * */
export const loadingSelector = (state: RootState) => state.googleAccessReducer.loading;
export const isLoginSelector = (state: RootState) => state.googleAccessReducer.isLogin;
export const calendarsSelector = (state: RootState) => state.googleAccessReducer.calendars;
export const statusSelector = (state: RootState) => state.googleAccessReducer.status;
export const userInfoSelector = (state: RootState) => state.googleAccessReducer.userInfo;
export const preloadingSelector = (state: RootState) => state.googleAccessReducer.preloading;

/**
 * Action Creators
 * */
export type GetAccessType = {
  type: typeof GET_ACCESS_REQUEST;
};

export type Logout = {
  type: typeof LOGOUT_REQUEST;
};

export type CalendarSet = {
  type: typeof CALENDAR_SET_REQUEST;
  payload?: CalendarSetRequestPayload
};

export type SetNewStatus = {
  type: typeof SET_NEW_STATUS;
  payload: SetNewStatusPayload
};

export type MakeNewCalendar = {
  type: typeof MAKE_NEW_CALENDAR_REQUEST;
  payload: MakeNewCalendarPayload
};

export const getAccess = (): GetAccessType => ({
  type: GET_ACCESS_REQUEST,
});

export const logout = (): Logout => ({
  type: LOGOUT_REQUEST,
});

export const calendarSet = (payload: CalendarSetRequestPayload): CalendarSet => ({
  type: CALENDAR_SET_REQUEST,
  payload,
});

export const setNewStatus = (payload: SetNewStatusPayload): SetNewStatus => ({
  type: SET_NEW_STATUS,
  payload,
});

export const makeNewCalendar = (payload: MakeNewCalendarPayload): MakeNewCalendar => ({
  type: MAKE_NEW_CALENDAR_REQUEST,
  payload,
});

export const bookingSaga = function* () {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
  });
  yield put({
    type: GET_ACCESS_START,
  });
  try {
    yield* call([GoogleSignin, 'hasPlayServices'], { showPlayServicesUpdateDialog: true });
    const userInfo = yield* call(GoogleSignin.signIn);
    if (isIphone) {
      const args = { scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'] };
      yield* call([GoogleSignin, 'addScopes'], args);
    }
    const currentUser = yield* call(GoogleSignin.getTokens);
    yield call(dataToStore, 'accessToken', currentUser.accessToken);
    const { data } = yield call(apiService.getCalendarList, currentUser.accessToken);
    // console.log('calendars', data?.items);

    let page = 1;
    const perPage = 6;
    const newArr: CalendarsList = {
      items: [],
      total: data?.items.length,
    };
    let obj: CalendarsListItem = {
      items: [],
      total: 0,
    };
    let totalArray = 0;
    data?.items.map((item: CalendarItem, index: number) => {
      obj.items.push(item);
      // console.log(obj);
      // console.log(index, (data?.items.length - 1));
      if ((index + 1) === (page * (perPage)) || index === (data?.items.length - 1)) {
        // console.log((index + 1) === (page * (perPage)), index === (data?.items.length - 1));
        page += 1;
        newArr.items.push(obj);
        totalArray += obj.items.length;
        obj.total = totalArray;
        obj = {
          items: [],
          total: 0,
        };
      }
      return null;
    });

    // console.log('newArr', newArr);

    yield put({
      type: GET_ACCESS_SUCCESS,
      payload: { calendars: newArr, userInfo: userInfo.user },
    });
  } catch (error) {
    console.log('error', { error });
    yield put({
      type: GET_ACCESS_ERROR,
      payload: { saga: bookingSaga, sagaPayload: {} },
      error,
    });
  }
};

export const logoutSaga = function* () {
  yield put({
    type: LOGOUT_START,
  });
  try {
    yield call(GoogleSignin.signOut);
    yield call(clearAsyncStorage);
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: LOGOUT_ERROR,
    });
  }
};

export const calendarSetSaga = function* ({ payload }: CalendarSetRequest) {
  yield put({
    type: CALENDAR_SET_START,
  });
  try {
    const { id, name } = payload;
    yield call(dataToStore, 'calendarID', id);
    yield call(dataToStore, 'meetingName', name);
    // console.log('id', id);
    yield put({
      type: CALENDAR_SET_SUCCESS,
    });
    yield put({
      type: PRELOAD_BOOKING_REQUEST,
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: CALENDAR_SET_ERROR,
    });
  }
};

export const makeNewCalendarSaga = function* ({ payload }: MakeNewCalendarRequest) {
  yield put({
    type: MAKE_NEW_CALENDAR_START,
  });
  try {
    const { name } = payload;
    const accessToken = yield* call(retrieveData, 'accessToken');
    const { data } = yield call(apiService.makeCalendar, accessToken, name);
    // console.log('data', data);
    yield call(dataToStore, 'calendarID', data.id);
    yield call(dataToStore, 'meetingName', data.summary);
    yield put({
      type: MAKE_NEW_CALENDAR_SUCCESS,
    });
    yield put({
      type: PRELOAD_BOOKING_REQUEST,
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: MAKE_NEW_CALENDAR_ERROR,
      payload: { saga: makeNewCalendarSaga, sagaPayload: payload },
      error,
    });
  }
};

export function* saga() {
  yield* all([
    takeLatest(GET_ACCESS_REQUEST, bookingSaga),
    takeLatest(LOGOUT_REQUEST, logoutSaga),
    takeLatest(CALENDAR_SET_REQUEST, calendarSetSaga),
    takeLatest(MAKE_NEW_CALENDAR_REQUEST, makeNewCalendarSaga),
    takeLatest(GET_ACCESS_ERROR, errorSaga),
    takeLatest(MAKE_NEW_CALENDAR_ERROR, errorSaga),
  ]);
}
