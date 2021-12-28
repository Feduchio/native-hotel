import {
  HOTEL_LIST_SUCCESS_ACTION,
  SEARCH_FORM_SUBMIT_ACTION,
  ADD_FAVORITE_HOTEL_ACTION,
} from "./actions";

const defaultState = {
  hotelList: [],
  valueSearchForm: {},
  favoriteHotels: [],
};

const reducer = function (state = defaultState, action) {
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
};

export default reducer;
