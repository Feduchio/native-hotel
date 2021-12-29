import { ADD_FAVORITE_HOTEL_ACTION, HOTEL_LIST_ACTION, HOTEL_LIST_SUCCESS_ACTION, SEARCH_FORM_SUBMIT_ACTION } from "./searchingHotels";

export interface HotelsState {
    hotelList: [];
    valueSearchForm: {},
    favoriteHotels: [],
}

export interface HotelListActionPayload {
    params: {},
}

export interface HotelListSuccActionPayload {
    hotels: {},
}

export interface SearchFormSubmitActionPayload {
    params: {},
}

export interface AddFavoriteHotelActionPayload {
    id: number;
}

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
    | HotelListAction
    | HotelListSuccAction
    | SearchFormSubmitAction
    | AddFavoriteHotelAction;