import { call, put, takeLatest } from "redux-saga/effects";
// import { api } from "../api/api";
import { hotelListSuccess, HOTEL_LIST_ACTION } from "./actions";
import moment from "moment";

function* hotelListSaga({ payload: params }) {
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
    yield put(hotelListSuccess(hotels));
  } finally {
  }
}

export function* rootSaga() {
  yield takeLatest(HOTEL_LIST_ACTION, hotelListSaga);
}
