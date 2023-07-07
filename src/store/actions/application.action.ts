import { QueryDocumentSnapshot } from "firebase/firestore";


export const GET_STATUS = '[APPLICATION] STATUS';

export const getApplications = (docs: QueryDocumentSnapshot[]) => {
  return {
    type: GET_STATUS,
    payload: docs
  }
}