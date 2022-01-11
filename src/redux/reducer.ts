import { combineReducers } from "redux";
import hotelsReducer from "./ducks/searchingHotels";

const reducer = combineReducers({
  hotelsReducer,
});

export default reducer;

export type RootState = {
  hotelsReducer: {
    userLogin: string;
    hotelList: string[];
    valueSearchForm: {checkIn: string, countOfDays: number, location: string};
    favoriteHotels: [];
  };
};
