export const SET_USER_DATA = '[USER] SET DATA';

export const setUserData = (user: any) => {
  return {
    type: SET_USER_DATA,
    payload: user
  }
}