

import {
  SET_DOCUMENTS,
} from '../action/fetch-documents'


const initialState = [];

export default function reducer(state = initialState, action) {
  if (action.type === SET_DOCUMENTS) {
    return action.payload;
  }  
  // else if (action.type === SET_DOCUMENT){
  //   return action.payload;
  // }
  return state;
}
