import { takeLatest } from "typed-redux-saga";
import { hotelListSaga, HOTEL_LIST_ACTION } from "./ducks/searchingHotels";
import * as Effects from "redux-saga/effects";

const call: any = Effects.call;
export function* rootSaga() {
  yield takeLatest(HOTEL_LIST_ACTION, hotelListSaga);
}
