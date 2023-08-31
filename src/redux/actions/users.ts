import { Dispatch, AnyAction } from "redux";
import api from "../../utils/api";

type ThunkResult<R> = (
  dispatch: Dispatch<AnyAction>,
  getState: () => any
) => Promise<R>;

export const getUsers = (): ThunkResult<AnyAction>  => {
  return (dispatch, getState) => {
    return new Promise(async (resolve: any, reject: any) => {
      await api
        .get("/users")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};
export const postUsers = (payload): ThunkResult<any> => {
  return async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      await api
        .post("/users", payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};
export const updateUsers = (payload) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      await api
        .put("/users", payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};
