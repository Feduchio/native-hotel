import { takeLatest } from "typed-redux-saga";
import { hotelListSaga, HOTEL_LIST_ACTION } from "./ducks/searchingHotels";

export function* rootSaga() {
  yield takeLatest(HOTEL_LIST_ACTION, hotelListSaga);
}
