import { all } from 'typed-redux-saga';

import { saga as getBookingSaga } from './ducks/bookings';
import { saga as googleAccessSaga } from './ducks/googleAccess';
import { saga as errorSaga } from './ducks/error';

export default function* saga() {
  yield* all([
    getBookingSaga(),
    googleAccessSaga(),
    errorSaga(),
  ]);
}
