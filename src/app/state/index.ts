import {Action, ActionReducerMap, createReducer, MetaReducer, on} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {PersonDto} from '../model/person.dto';
import {PersonActions} from './person.actions';

export class PersonState {
  currentPerson: PersonDto;
}

export interface State {
  person: PersonState;
}

const initialState: PersonState = {
  currentPerson: null
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const personReducer = createReducer(
  initialState,
  on(PersonActions.loadPersonSuccess, (state, {person}) => ({
    ...state,
    currentPerson: person
  }))
);

export const reducers: ActionReducerMap<State> = {
  person: personReducer
};

export function reducer(state: PersonState | undefined, action: Action) {
  return personReducer(state, action);
}
