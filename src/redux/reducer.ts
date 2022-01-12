import { combineReducers } from "redux";
import hotelsReducer from "./ducks/searchingHotels";

const reducer = combineReducers({
  hotelsReducer,
});

export default reducer;

export type RootState = {
  hotelsReducer: {
    userLogin: string;
    hotelList: {data: [{hotelId: number, hotelName: string, stars: number, priceAvg: number}]};
    valueSearchForm: { checkIn: string; countOfDays: number; location: string };
    favoriteHotels: {hotelId: number, hotelName: string, stars: number, priceAvg: number};
  };
};
