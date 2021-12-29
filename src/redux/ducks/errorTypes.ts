import {
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
} from './error';

export interface ErrorState {
  loading: boolean,
  error: any,
}

export interface RefreshTokenErrorPayload {
  error: any,
}

export type RefreshTokenStart = {
  type: typeof REFRESH_TOKEN_START;
};

export type RefreshTokenSuccess = {
  type: typeof REFRESH_TOKEN_SUCCESS;
};

export type RefreshTokenError = {
  type: typeof REFRESH_TOKEN_ERROR;
  payload: RefreshTokenErrorPayload;

};

export type ErrorActions =
  | RefreshTokenStart
  | RefreshTokenSuccess
  | RefreshTokenError;
