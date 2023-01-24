import { configureStore } from '@reduxjs/toolkit';
import { Reducer, initialState } from './reducer'
import { combineReducers, applyMiddleware, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { createForms } from 'react-redux-form';

// export const ConfigureStore = () => {
//   const store = legacy_createStore(
//     combineReducers({
//       dishes: Dishes,
//       comments: Comments,
//       promotions: Promotions,
//       leaders: Leaders,
//       ...createForms({
//         feedback: InitialFeedback
//       })
//     }),
//     applyMiddleware(thunk, logger)
//   );
//   return store;
// }

export const ConfigureStore = () => {
  const store = legacy_createStore(
    Reducer,
    initialState,
  );

  return store;
}
