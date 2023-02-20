configureStore.js
```js
import { createStore } from 'redux';
import { Reducer, initialState } from './reducer'

export const ConfigureStore = () => {
  const store = createStore(
    Reducer,
    initialState,
  );

  return store;
}
```

reducer.js
```js
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

export const Reducer = (state = initialState, action) => {
    return state;
};
```