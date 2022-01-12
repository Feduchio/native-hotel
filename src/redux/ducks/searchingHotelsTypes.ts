import {
  ADD_FAVORITE_HOTEL_ACTION,
  SET_USER_LOGIN_ACTION,
  HOTEL_LIST_ACTION,
  HOTEL_LIST_SUCCESS_ACTION,
  SEARCH_FORM_SUBMIT_ACTION,
} from "./searchingHotels";

export interface HotelsState {
  userLogin: string;
  hotelList: {data: [{hotelId: number, hotelName: string, stars: number, priceAvg: number}]};
  valueSearchForm: {};
  favoriteHotels: [];
}

export interface HotelListActionPayload {
  params: {};
}

export interface AddUserLoginActionPayload {
  params: string;
}

export interface HotelListSuccActionPayload {
  hotels: {};
}

export interface SearchFormSubmitActionPayload {
  params: {};
}

export interface AddFavoriteHotelActionPayload {
  id: number; name: string; checkIn: string; countOfDays: number; stars: number; priceAvg: number; 
}

export type AddUserLoginAction = {
  type: typeof SET_USER_LOGIN_ACTION;
  payload: AddUserLoginActionPayload;
};

export type HotelListAction = {
  type: typeof HOTEL_LIST_ACTION;
  payload: HotelListActionPayload;
};

export type HotelListSuccAction = {
  type: typeof HOTEL_LIST_SUCCESS_ACTION;
  payload: HotelListSuccActionPayload;
};

export type SearchFormSubmitAction = {
  type: typeof SEARCH_FORM_SUBMIT_ACTION;
  payload: SearchFormSubmitActionPayload;
};

export type AddFavoriteHotelAction = {
  type: typeof ADD_FAVORITE_HOTEL_ACTION;
  payload: AddFavoriteHotelActionPayload;
};

export type HotelsActions =
  | AddUserLoginAction
  | HotelListAction
  | HotelListSuccAction
  | SearchFormSubmitAction
  | AddFavoriteHotelAction;
