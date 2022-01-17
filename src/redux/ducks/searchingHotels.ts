import { call, put } from "redux-saga/effects";
import api from "../../../api/api";
import moment from "moment";

import {
  AddFavoriteHotelActionPayload,
  HotelListSuccActionPayload,
  HotelsActions,
  HotelsState,
} from "./searchingHotelsTypes";
import { RootState } from "../reducer";

const prefix = "searchingHotels/";

/**
 * Constants
 * */
export const image = {
  uri: "https://images.unsplash.com/photo-1589876876491-df78ff60e196?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
};
export const HOTEL_LIST_ACTION = `${prefix}HOTEL_LIST_ACTION` as const;
export const SET_USER_LOGIN_ACTION = `${prefix}SET_USER_LOGIN_ACTION` as const;
export const HOTEL_LIST_SUCCESS_ACTION =
  `${prefix}HOTEL_LIST_SUCCESS_ACTION` as const;
export const SEARCH_FORM_SUBMIT_ACTION =
  `${prefix}SEARCH_FORM_SUBMIT_ACTION` as const;
export const ADD_FAVORITE_HOTEL_ACTION =
  `${prefix}ADD_FAVORITE_HOTEL_ACTION` as const;
export const CLEAR_FAVORITE_HOTEL_ACTION =
  `${prefix}CLEAR_FAVORITE_HOTEL_ACTION` as const;

/**
 * Reducer
 * */
const initialState: HotelsState = {
  userLogin: "",
  hotelList: { data: [{ hotelId: 0, hotelName: "", stars: 0, priceAvg: 0 }] },
  valueSearchForm: {},
  favoriteHotels: [],
};
export default function hotelsReducer(
  state = initialState,
  action: HotelsActions
) {
  switch (action.type) {
    case HOTEL_LIST_SUCCESS_ACTION: {
      return {
        ...state,
        hotelList: action.payload,
      };
    }
    case SET_USER_LOGIN_ACTION: {
      return {
        ...state,
        userLogin: action.payload,
      };
    }
    case SEARCH_FORM_SUBMIT_ACTION: {
      return {
        ...state,
        valueSearchForm: action.payload,
      };
    }
    case ADD_FAVORITE_HOTEL_ACTION: {
      const { favoriteHotels } = state;
      const isHotelInFavorites = favoriteHotels.find(
        (hotel: { id: number }) => hotel.id === action.payload.id
      );
      if (isHotelInFavorites) {
        const newArr = favoriteHotels.filter((hotel: { id: number }) => {
          return hotel.id !== action.payload.id;
        });
        return {
          ...state,
          favoriteHotels: newArr,
        };
      }
      return {
        ...state,
        favoriteHotels: [...state.favoriteHotels, action.payload],
      };
    }
    case CLEAR_FAVORITE_HOTEL_ACTION: {
      return {
        ...state,
        favoriteHotels: [],
      };
    }
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const selectUserLogin = (state: RootState) =>
  state.hotelsReducer.userLogin;
export const selectValueSearch = (state: RootState) =>
  state.hotelsReducer.valueSearchForm;
export const selectHotels = (state: RootState) => state.hotelsReducer.hotelList;
export const selectFavorites = (state: RootState) =>
  state.hotelsReducer.favoriteHotels;

/**
 * Action Creators
 * */
export function setUser(login: string) {
  return { type: SET_USER_LOGIN_ACTION, payload: login };
}
export function getHotelsList(params: {
  location: string;
  checkIn: string;
  countOfDays: number;
}) {
  return { type: HOTEL_LIST_ACTION, payload: params };
}
export function hotelListSuccess(hotels: HotelListSuccActionPayload) {
  return { type: HOTEL_LIST_SUCCESS_ACTION, payload: hotels };
}
export function searchFormSubmit(params: {
  location: string;
  checkIn: string;
  countOfDays: number;
}) {
  return { type: SEARCH_FORM_SUBMIT_ACTION, payload: params };
}
export function addFavoriteHotel(id: AddFavoriteHotelActionPayload) {
  return { type: ADD_FAVORITE_HOTEL_ACTION, payload: id };
}
export function clearFavorites() {
  return { type: CLEAR_FAVORITE_HOTEL_ACTION };
}

/**
 * Sagas
 * */
export function* hotelListSaga({
  payload: params,
}: {
  payload: { location: string; checkIn: string; countOfDays: number };
}): Generator<{}> {
  try {
    const location = params.location || "moscow";
    const checkIn = params.checkIn || moment().format("YYYY-MM-DD");
    const checkOut =
      moment(params.checkIn)
        .add(params.countOfDays, "days")
        .format("YYYY-MM-DD") || moment().add(1, "days").format("YYYY-MM-DD");

    const hotels: any = yield call(api.hotelList, location, checkIn, checkOut);

    yield put(hotelListSuccess(hotels));
  } catch (error: any) {
    console.log("ERROR FROM DUCK", error.response);
  }
}
