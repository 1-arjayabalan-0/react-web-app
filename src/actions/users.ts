import api from "../utils/api";

export function getUsers() {
//   return (dispatch, setState) => {
    return new Promise(async (resolve, reject) => {
      await api
        .get("/Users")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
//   };
}
