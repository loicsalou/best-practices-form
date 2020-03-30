import {createSelector} from '@ngrx/store';
import {State} from './index';

export namespace Selectors {
  export const getPersonState = (state: State) => state.person;
  export const getCurrentPerson = createSelector(getPersonState, state => {
    return state.currentPerson;
  });
}
