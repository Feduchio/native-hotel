import {
  GET_ACCESS_REQUEST,
  GET_ACCESS_START,
  GET_ACCESS_SUCCESS,
  GET_ACCESS_ERROR,
  LOGOUT_SUCCESS,
  CALENDAR_SET_REQUEST,
  CALENDAR_SET_START,
  CALENDAR_SET_SUCCESS,
  SET_NEW_STATUS,
  MAKE_NEW_CALENDAR_REQUEST,
  MAKE_NEW_CALENDAR_START,
  MAKE_NEW_CALENDAR_ERROR,
  MAKE_NEW_CALENDAR_SUCCESS,
  NEED_LOGIN,
} from './googleAccess';

export type CalendarItem = {
  id: string;
  summary: string;
};

export type UserInfo = {
  email: string;
};

// export type CalenadrsArray = {
//   [calendars: string]: CalendarItem
// };
export type CalendarsList = {
  items: CalendarsListItem[];
  total: number
};

export type CalendarsListItem = {
  items: CalendarItem[];
  total: number
};

// export type CalendarsItem = {
//   [index: number]: CalendarItem;
// }[];
export interface GoogleAccessState {
  loading: boolean,
  isLogin: boolean,
  calendars: CalendarsList,
  status: string,
  userInfo: UserInfo | null,
  preloading: boolean
}

export interface CalendarSetRequestPayload {
  id: string;
  name: string;
}

export interface SetNewStatusPayload {
  status: string;
}

export interface MakeNewCalendarPayload {
  name: string;
}

export type GetAccessRequest = {
  type: typeof GET_ACCESS_REQUEST;
};
export type CalendarSetRequest = {
  type: typeof CALENDAR_SET_REQUEST;
  payload: CalendarSetRequestPayload
};
export type MakeNewCalendarRequest = {
  type: typeof MAKE_NEW_CALENDAR_REQUEST;
  payload: MakeNewCalendarPayload
};
export type GetAccessStart = {
  type: typeof GET_ACCESS_START;
};

export type GetAccessSuccess = {
  type: typeof GET_ACCESS_SUCCESS;
  payload: { calendars: CalendarsList, userInfo: UserInfo }
};

export type GetAccessError = {
  type: typeof GET_ACCESS_ERROR;
};
export type LogoutSuccess = {
  type: typeof LOGOUT_SUCCESS;
};
export type CalendarSetStart = {
  type: typeof CALENDAR_SET_START;
};
export type CalendarSetSuccess = {
  type: typeof CALENDAR_SET_SUCCESS;
};
export type MakeNewCalendarSuccess = {
  type: typeof MAKE_NEW_CALENDAR_SUCCESS;
};

export type MakeNewCalendarStart = {
  type: typeof MAKE_NEW_CALENDAR_START;
};

export type MakeNewCalendarError = {
  type: typeof MAKE_NEW_CALENDAR_ERROR;
};

export type SetNewStatus = {
  type: typeof SET_NEW_STATUS;
  payload: SetNewStatusPayload
};

export type NeedLogin = {
  type: typeof NEED_LOGIN;
};

export type GoogleAccessActions =
  | GetAccessRequest
  | GetAccessStart
  | GetAccessSuccess
  | GetAccessError
  | LogoutSuccess
  | CalendarSetStart
  | CalendarSetSuccess
  | SetNewStatus
  | MakeNewCalendarSuccess
  | MakeNewCalendarStart
  | MakeNewCalendarError
  | NeedLogin;
