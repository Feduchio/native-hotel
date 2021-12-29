import { combineReducers } from 'redux';

import bookingsReducer from './ducks/bookings';
import googleAccessReducer from './ducks/googleAccess';
import errorReducer from './ducks/error';

const reducer = combineReducers({
  bookingsReducer,
  googleAccessReducer,
  errorReducer,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
