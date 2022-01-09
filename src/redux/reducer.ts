import { combineReducers } from "redux";
import hotelsReducer from "./ducks/searchingHotels";

const reducer = combineReducers({
  hotelsReducer,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
