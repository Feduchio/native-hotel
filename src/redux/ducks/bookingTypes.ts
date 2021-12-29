import {
  BOOKING_REQUEST,
  BOOKING_START,
  BOOKING_SUCCESS,
  BOOKING_ERROR,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_START,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_ERROR,
  PRELOAD_BOOKING_REQUEST,
  PRELOAD_BOOKING_START,
  PRELOAD_BOOKING_SUCCESS,
  PRELOAD_BOOKING_ERROR,
  PRELOAD_START,
  PRELOAD_END,
  SET_NAME_REQUEST,
  SET_NAME_START,
  SET_NAME_SUCCESS,
  SET_NAME_ERROR,
  UPDATE_BOOKINGS_SUCCESS,
} from './bookings';

export interface BookingObj {
  dateFrom: Date,
  dateTo: Date,
  name: string,
  topic: string,
  selectedDate: string,
  id: string,
  isCrossing?: boolean,
  created?: Date
}

export interface BookingState {
  bookings: BookingList | {};
  loading: boolean,
  preload: boolean,
  name: string,
}
export type BookingList = {
  [index: string]: BookingObj[];
};
export interface GetBookingSuccessPayload {
  bookings: BookingList,
  name: string,
}
export interface GetBookingRequestPayload {
  bookingObj: BookingObj
}
export interface SetNameRequestPayload {
  name: string;
}
export interface BookingDeleteRequestPayload {
  busyItem?: BookingObj | null
}

export type GetBookingRequest = {
  type: typeof BOOKING_REQUEST;
  payload: GetBookingRequestPayload;
};

export type GetBookingStart = {
  type: typeof BOOKING_START;
};

export type GetBookingSuccess = {
  type: typeof BOOKING_SUCCESS;
  payload: GetBookingSuccessPayload;
};

export type GetBookingError = {
  type: typeof BOOKING_ERROR;
};

export type BookingDeleteRequest = {
  type: typeof BOOKING_DELETE_REQUEST;
  payload?: BookingDeleteRequestPayload;
};

export type BookingDeleteStart = {
  type: typeof BOOKING_DELETE_START;
};

export type BookingDeleteSuccess = {
  type: typeof BOOKING_DELETE_SUCCESS;
  payload: GetBookingSuccessPayload;
};

export type BookingDeleteError = {
  type: typeof BOOKING_DELETE_ERROR;
};

export type PreloadBookingRequest = {
  type: typeof PRELOAD_BOOKING_REQUEST;
};

export type PreloadBookingStart = {
  type: typeof PRELOAD_BOOKING_START;
};

export type PreloadBookingSuccess = {
  type: typeof PRELOAD_BOOKING_SUCCESS;
  payload: GetBookingSuccessPayload;
};

export type PreloadBookingError = {
  type: typeof PRELOAD_BOOKING_ERROR;
};

export type PreloadStart = {
  type: typeof PRELOAD_START;
};

export type PreloadEnd = {
  type: typeof PRELOAD_END;
};

export type SetNameRequest = {
  type: typeof SET_NAME_REQUEST;
  payload: SetNameRequestPayload;
};

export type SetNameStart = {
  type: typeof SET_NAME_START;
};

export type SetNameSuccess = {
  type: typeof SET_NAME_SUCCESS;
  payload: SetNameRequestPayload;
};

export type SetNameError = {
  type: typeof SET_NAME_ERROR;
};

export type UpdateBookingSuccess = {
  type: typeof UPDATE_BOOKINGS_SUCCESS;
  payload: GetBookingSuccessPayload;
};

export type BookingActions =
  | GetBookingRequest
  | GetBookingStart
  | GetBookingSuccess
  | GetBookingError
  | BookingDeleteRequest
  | BookingDeleteStart
  | BookingDeleteSuccess
  | BookingDeleteError
  | PreloadBookingRequest
  | PreloadBookingStart
  | PreloadBookingSuccess
  | PreloadBookingError
  | PreloadStart
  | PreloadEnd
  | SetNameRequest
  | SetNameStart
  | SetNameSuccess
  | SetNameError
  | UpdateBookingSuccess;
