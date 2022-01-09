import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../api/api";
import moment from "moment";
import {
  AddFavoriteHotelActionPayload,
  HotelListActionPayload,
  HotelListSuccActionPayload,
  HotelsActions,
  HotelsState,
  SearchFormSubmitActionPayload,
} from "./searchingHotelsTypes";
import { RootState } from "../store";

const prefix = "searchingHotels/";

/**
 * Constants
 * */
export const HOTEL_LIST_ACTION = `${prefix}HOTEL_LIST_ACTION` as const;
export const HOTEL_LIST_SUCCESS_ACTION =
  `${prefix}HOTEL_LIST_SUCCESS_ACTION` as const;
export const SEARCH_FORM_SUBMIT_ACTION =
  `${prefix}SEARCH_FORM_SUBMIT_ACTION` as const;
export const ADD_FAVORITE_HOTEL_ACTION =
  `${prefix}ADD_FAVORITE_HOTEL_ACTION` as const;

/**
 * Reducer
 * */
const initialState: HotelsState = {
  hotelList: [],
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
    case SEARCH_FORM_SUBMIT_ACTION: {
      return {
        ...state,
        valueSearchForm: action.payload,
      };
    }
    case ADD_FAVORITE_HOTEL_ACTION: {
      const { favoriteHotels } = state;
      const isHotelInFavorites = favoriteHotels.find(
        (hotel) => hotel.id === action.payload.id
      );
      if (isHotelInFavorites) {
        const newArr = favoriteHotels.filter((hotel) => {
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
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const selectValueSearch = (state: { valueSearchForm: {} }) =>
  state.valueSearchForm;
export const selectHotels = (state: { hotelList: {} }) => state.hotelList;
export const selectFavorites = (state: { favoriteHotels: {} }) =>
  state.favoriteHotels;

/**
 * Action Creators
 * */
export function getHotelsList(params: HotelListActionPayload) {
  return { type: HOTEL_LIST_ACTION, payload: params };
}

export function hotelListSuccess(hotels: HotelListSuccActionPayload) {
  return { type: HOTEL_LIST_SUCCESS_ACTION, payload: hotels };
}

export function searchFormSubmit(params: SearchFormSubmitActionPayload) {
  return { type: SEARCH_FORM_SUBMIT_ACTION, payload: params };
}

export function addFavoriteHotel(id: AddFavoriteHotelActionPayload) {
  return { type: ADD_FAVORITE_HOTEL_ACTION, payload: id };
}

export function* hotelListSaga({ payload: params }): Generator<{}> {
  try {
    const hotels = yield call(api.hotelList, {
      location: params?.location || "Moscow",
      checkIn: params?.checkIn || moment().format("YYYY-MM-DD"),
      checkOut:
        moment(params?.checkIn)
          .add(params?.countOfDays, "days")
          .format("YYYY-MM-DD") ||
        moment(params?.checkIn).add(1, "days").format("YYYY-MM-DD"),
    });
    yield put({ type: HOTEL_LIST_SUCCESS_ACTION, payload: hotels });
  } finally {
  }
}
