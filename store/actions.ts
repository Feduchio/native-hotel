import { FC } from "react";

export const HOTEL_LIST_ACTION = "HOTEL_LIST_ACTION" as const
export const HOTEL_LIST_SUCCESS_ACTION = "HOTEL_LIST_SUCCESS_ACTION" as const
export const SEARCH_FORM_SUBMIT_ACTION = "SEARCH_FORM_SUBMIT_ACTION" as const
export const ADD_FAVORITE_HOTEL_ACTION = "ADD_FAVORITE_HOTEL_ACTION" as const

export function getHotelsList(params:  Array<FC>) {
  return { type: HOTEL_LIST_ACTION, payload: params };
}

export function hotelListSuccess(hotels:  Array<FC>) {
  return { type: HOTEL_LIST_SUCCESS_ACTION, payload: hotels };
}

export function searchFormSubmit(params: Array<FC>) {
  return { type: SEARCH_FORM_SUBMIT_ACTION, payload: params };
}

export function addFavoriteHotel(id: number) {
  return { type: ADD_FAVORITE_HOTEL_ACTION, payload: id };
}
