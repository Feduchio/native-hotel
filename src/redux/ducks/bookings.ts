import {
  takeLatest, put, all, select, call, takeEvery,
} from 'typed-redux-saga';
import moment from 'moment';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  BookingState, BookingActions, BookingList, GetBookingRequest, GetBookingRequestPayload,
  BookingDeleteRequestPayload, BookingDeleteRequest, SetNameRequestPayload, SetNameRequest,
} from './bookingTypes';
import { RootState } from '../store';
import { today, formatEvents } from '../../constants/Layout';
import {
  dataToStore, retrieveData,
//  clearAsyncStorage
} from '../../etc/AsyncStorageManipulator';
import {
  CALENDAR_SET_SUCCESS, NEED_LOGIN,
  // LOGOUT_REQUEST
} from './googleAccess';
import apiService from '../../api';
import { errorSaga } from './error';

export const prefix = 'booking/';

/**
 * Constants
 * */

export const PRELOAD_START = `${prefix}PRELOAD_START` as const;
export const PRELOAD_END = `${prefix}PRELOAD_END` as const;

export const SET_NAME_REQUEST = `${prefix}SET_NAME_REQUEST` as const;
export const SET_NAME_START = `${prefix}SET_NAME_START` as const;
export const SET_NAME_SUCCESS = `${prefix}SET_NAME_SUCCESS` as const;
export const SET_NAME_ERROR = `${prefix}SET_NAME_ERROR` as const;

export const PRELOAD_BOOKING_REQUEST = `${prefix}PRELOAD_BOOKING_REQUEST` as const;
export const PRELOAD_BOOKING_START = `${prefix}PRELOAD_BOOKING_START` as const;
export const PRELOAD_BOOKING_SUCCESS = `${prefix}PRELOAD_BOOKING_SUCCESS` as const;
export const PRELOAD_BOOKING_ERROR = `${prefix}PRELOAD_BOOKING_ERROR` as const;

export const BOOKING_REQUEST = `${prefix}BOOKING_REQUEST` as const;
export const BOOKING_START = `${prefix}BOOKING_START` as const;
export const BOOKING_SUCCESS = `${prefix}BOOKING_SUCCESS` as const;
export const BOOKING_ERROR = `${prefix}BOOKING_ERROR` as const;

export const BOOKING_DELETE_REQUEST = `${prefix}BOOKING_DELETE_REQUEST` as const;
export const BOOKING_DELETE_START = `${prefix}BOOKING_DELETE_START` as const;
export const BOOKING_DELETE_SUCCESS = `${prefix}BOOKING_DELETE_SUCCESS` as const;
export const BOOKING_DELETE_ERROR = `${prefix}BOOKING_DELETE_ERROR` as const;

export const UPDATE_BOOKINGS_REQUEST = `${prefix}UPDATE_BOOKINGS_REQUEST` as const;
export const UPDATE_BOOKINGS_START = `${prefix}UPDATE_BOOKINGS_START` as const;
export const UPDATE_BOOKINGS_SUCCESS = `${prefix}UPDATE_BOOKINGS_SUCCESS` as const;
export const UPDATE_BOOKINGS_DONT_NEEDED = `${prefix}UPDATE_BOOKINGS_DONT_NEEDED` as const;
export const UPDATE_BOOKINGS_ERROR = `${prefix}UPDATE_BOOKINGS_ERROR` as const;

/**
 * Reducer
 * */
export const initialState: BookingState = {
  bookings: {},
  loading: false,
  preload: true,
  name: '',
};
export default function bookingsReducer(state = initialState, action: BookingActions): BookingState {
  switch (action.type) {
    case BOOKING_DELETE_REQUEST:
    case BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRELOAD_START:
      return {
        ...state,
        preload: true,
      };
    case PRELOAD_END:
      return {
        ...state,
        preload: false,
      };
    case SET_NAME_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
      };
    case PRELOAD_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: action.payload.bookings,
        name: action.payload.name,
        preload: false,
      };
    case UPDATE_BOOKINGS_SUCCESS:
    case BOOKING_SUCCESS:
      return {
        ...state,
        bookings: action.payload.bookings,
        loading: false,
        preload: false,
      };
    case BOOKING_DELETE_SUCCESS:
      return {
        ...state,
        bookings: action.payload.bookings,
        loading: false,
      };
    case BOOKING_DELETE_ERROR:
    case BOOKING_ERROR:
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
export const bookingsSelector = (state: RootState) => state.bookingsReducer.bookings;
export const loadingSelector = (state: RootState) => state.bookingsReducer.loading;
export const preloadSelector = (state: RootState) => state.bookingsReducer.preload;
export const nameSelector = (state: RootState) => state.bookingsReducer.name;

/**
 * Action Creators
 * */
export type SetBookings = {
  type: typeof BOOKING_REQUEST;
  payload: GetBookingRequestPayload
};

export type DeleteBookings = {
  type: typeof BOOKING_DELETE_REQUEST;
  payload?: BookingDeleteRequestPayload
};

export type PreloadBooking = {
  type: typeof PRELOAD_BOOKING_REQUEST;
};

export type UpdatesBooking = {
  type: typeof UPDATE_BOOKINGS_REQUEST;
};

export type SetName = {
  type: typeof SET_NAME_REQUEST;
  payload: SetNameRequestPayload
};

export const preloadBookings = (): PreloadBooking => ({
  type: PRELOAD_BOOKING_REQUEST,
});

export const setBooking = (payload: GetBookingRequestPayload): SetBookings => ({
  type: BOOKING_REQUEST,
  payload,
});

export const deleteBooking = (payload?: BookingDeleteRequestPayload): DeleteBookings => ({
  type: BOOKING_DELETE_REQUEST,
  payload,
});

export const preloadStart = () => ({
  type: PRELOAD_START,
});

export const preloadEnd = () => ({
  type: PRELOAD_END,
});

export const setName = (payload: SetNameRequestPayload): SetName => ({
  type: SET_NAME_REQUEST,
  payload,
});

export const updatesBooking = (): UpdatesBooking => ({
  type: UPDATE_BOOKINGS_REQUEST,
});

export const preloadBookingSaga = function* () {
  yield put({
    type: PRELOAD_BOOKING_START,
  });
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'],
  });
  try {
    // yield* call(clearAsyncStorage);
    // yield put({
    //   type: LOGOUT_REQUEST,
    // });
    // let bookings = yield* call(retrieveData, 'bookings');
    const name = yield* call(retrieveData, 'meetingName') || '';
    const calendarID = yield* call(retrieveData, 'calendarID');
    console.log('calendarID', calendarID);
    // yield* call(GoogleSignin.revokeAccess);
    if (calendarID) {
      // yield* call(GoogleSignin.revokeAccess);
      const accessToken = yield* call(retrieveData, 'accessToken');
      const { data } = yield call(apiService.getEvents, accessToken, calendarID);
      const gBookings = yield* call(formatEvents, data?.items);
      console.log('gBookings', gBookings);
      // console.log('events', gBookings);
      // console.log('events1', bookings);
      // if (bookings) {
      //   const DateArray = Object.keys(bookings);
      //   DateArray.map((i) => {
      //     bookings[i].map((j: BookingObj) => {
      //       const obj: BookingObj = j;
      //       obj.dateFrom = new Date(j.dateFrom);
      //       obj.dateTo = new Date(j.dateTo);
      //       return obj;
      //     });
      //     return null;
      //   });
      // } else {
      //   bookings = {};
      // }
      yield put({
        type: PRELOAD_BOOKING_SUCCESS,
        payload: { bookings: gBookings, name },
      });
      yield put({
        type: CALENDAR_SET_SUCCESS,
      });
    } else {
      yield put({
        type: NEED_LOGIN,
      });
    }
  } catch (error: any) {
    console.log('error', error.response);
    yield put({
      type: PRELOAD_BOOKING_ERROR,
      payload: { saga: preloadBookingSaga, sagaPayload: {} },
      error,
    });
  }
};

export const bookingSaga = function* ({ payload } : GetBookingRequest) {
  yield put({
    type: BOOKING_START,
  });
  try {
    const { bookingObj } = payload;
    const dataObj = {
      summary: bookingObj.topic,
      description: bookingObj.name,
      start: { dateTime: bookingObj.dateFrom },
      end: { dateTime: bookingObj.dateTo },
      // attendees: [
      //   {
      //     displayName: 'testetster',
      //     email: 'medarzr@gmail.com',
      //   },
      // ],
    };
    const accessToken = yield* call(retrieveData, 'accessToken');
    const calendarID = yield* call(retrieveData, 'calendarID');
    const { data } = yield call(apiService.postEvent, accessToken, calendarID, dataObj);
    bookingObj.id = data?.id;
    // console.log('event', data, bookingObj);
    const key = bookingObj.selectedDate;
    const prevBookings: BookingList = yield select(bookingsSelector);
    if (!prevBookings[key]) prevBookings[key] = [];
    prevBookings[key].push(bookingObj);
    prevBookings[key].sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());
    // console.log('prevBookings', prevBookings);
    yield call(dataToStore, 'bookings', prevBookings);
    yield put({
      type: BOOKING_SUCCESS,
      payload: { bookings: prevBookings },
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: BOOKING_ERROR,
      payload: { saga: bookingSaga, sagaPayload: payload },

    });
  }
};

export const deleteBookingSaga = function* ({ payload } : BookingDeleteRequest) {
  yield put({
    type: BOOKING_DELETE_START,
  });
  try {
    const bookings: BookingList = yield select(bookingsSelector);
    const todayValue = today();
    let selectedDate = moment(todayValue).format('YYYY-MM-DD');
    const DateArray = Object.keys(bookings); // Get all created dates;
    DateArray.map((item) => { // Find if some of dates are gone, we delete all history about it;
      if (moment(item).isBefore(selectedDate)) {
        delete bookings[item];
      }
      return null;
    });
    if (payload?.busyItem) { // delete specific booking;
      const { busyItem } = payload;
      selectedDate = busyItem.selectedDate;
      const newArray = bookings[selectedDate]?.filter((item) => item.dateFrom !== busyItem.dateFrom && item.dateTo !== busyItem.dateTo);
      bookings[selectedDate] = newArray;
      // console.log('itemdeleteItem', busyItem);
      const accessToken = yield* call(retrieveData, 'accessToken');
      const calendarID = yield* call(retrieveData, 'calendarID');
      yield* call(apiService.deleteEvent, accessToken, calendarID, busyItem.id);
      // console.log('deleteItem', deleteItem);
    } else if (bookings[selectedDate]) { // check past bookings;
      // console.log('prevBookings', todayValue >= bookings[selectedDate][0].dateTo);
      const newArray = bookings[selectedDate].filter((item) => (todayValue < item.dateTo));
      bookings[selectedDate] = newArray;
    }
    yield call(dataToStore, 'bookings', bookings);
    yield put({
      type: BOOKING_DELETE_SUCCESS,
      payload: { bookings },
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: BOOKING_DELETE_ERROR,
      payload: { saga: deleteBookingSaga, sagaPayload: payload },
    });
  }
};

export const setNameSaga = function* ({ payload } : SetNameRequest) {
  yield put({
    type: SET_NAME_START,
  });
  try {
    const { name } = payload;
    const accessToken = yield* call(retrieveData, 'accessToken');
    const calendarID = yield* call(retrieveData, 'calendarID');
    // console.log(bookingObj.selectedDate);
    yield* call(apiService.patchCalendar, accessToken, calendarID, name);
    yield call(dataToStore, 'meetingName', name);
    yield put({
      type: SET_NAME_SUCCESS,
      payload: { name },
    });
  } catch (error) {
    console.log('error', error);
    yield put({
      type: SET_NAME_ERROR,
      payload: { saga: setNameSaga, sagaPayload: payload },
    });
  }
};

export const updatesSaga = function* () {
  yield put({
    type: UPDATE_BOOKINGS_START,
  });
  try {
    const accessToken = yield* call(retrieveData, 'accessToken');
    const calendarID = yield* call(retrieveData, 'calendarID');
    const { data } = yield call(apiService.getEvents, accessToken, calendarID);
    const gBookings = yield* call(formatEvents, data?.items);
    const prevBookings: BookingList = yield select(bookingsSelector);

    // ==== check on past bookings (fixed min data in getEvents) ====//
    // const todayValue = today();
    // const selectedDate = moment(todayValue).format('YYYY-MM-DD');
    // const DateArray = Object.keys(gBookings); // Get all created dates;
    // console.log(gBookings);
    // DateArray.map((item) => { // Find if some of dates are gone, we delete all history about it;
    //   if (moment(item).isBefore(selectedDate)) {
    //     delete gBookings[item];
    //   }
    //   return null;
    // });
    // if (gBookings[selectedDate]) {
    //   const result = gBookings[selectedDate].filter((item) => moment(item.dateTo).isAfter(new Date()));
    //   gBookings[selectedDate] = result;
    // }
    // ============================================================//

    const gBookingsKeys = Object.keys(gBookings);
    const prevBookingsKeys = Object.keys(prevBookings);
    const isNewDatesBooking = (gBookingsKeys.length !== prevBookingsKeys.length);
    let isNewHoursBooking = false;
    // console.log(isNewDatesBooking);
    if (!isNewDatesBooking) {
      isNewHoursBooking = gBookingsKeys.some((key) => {
        let result: boolean = false;
        if (gBookings[key].length === prevBookings[key].length) {
          gBookings[key].some((item, index) => {
          // console.log(item?.dateFrom?.getTime() !== prevBookings[key][index]?.dateFrom?.getTime());
            // console.log(item.dateTo.getTime(), prevBookings[key][index]?.dateTo.getTime());
            // console.log(item.dateTo, prevBookings[key][index]?.dateTo);
            result = item.dateFrom.getTime() !== prevBookings[key][index]?.dateFrom.getTime()
          || item.dateTo.getTime() !== prevBookings[key][index]?.dateTo.getTime()
          || item.topic !== prevBookings[key][index]?.topic;
            return result;
          });
        } else {
          result = true;
          return result;
        }
        return result;
      });
    }
    if (isNewDatesBooking || isNewHoursBooking) {
      yield put({
        type: UPDATE_BOOKINGS_SUCCESS,
        payload: { bookings: gBookings },
      });
    } else {
      yield put({
        type: UPDATE_BOOKINGS_DONT_NEEDED,
      });
    }
  } catch (error: any) {
    console.log('error', error.response);
    yield put({
      type: UPDATE_BOOKINGS_ERROR,
      payload: { saga: updatesSaga, sagaPayload: {} },
      error,
    });
  }
};

export function* saga() {
  yield* all([
    takeLatest(PRELOAD_BOOKING_REQUEST, preloadBookingSaga),
    takeEvery(BOOKING_REQUEST, bookingSaga),
    takeEvery(BOOKING_DELETE_REQUEST, deleteBookingSaga),
    takeEvery(UPDATE_BOOKINGS_REQUEST, updatesSaga),
    takeLatest(SET_NAME_REQUEST, setNameSaga),
    takeLatest(UPDATE_BOOKINGS_ERROR, errorSaga),
    takeLatest(PRELOAD_BOOKING_ERROR, errorSaga),
    takeLatest(BOOKING_ERROR, errorSaga),
    takeLatest(BOOKING_DELETE_ERROR, errorSaga),
    takeLatest(SET_NAME_ERROR, errorSaga),
  ]);
}
