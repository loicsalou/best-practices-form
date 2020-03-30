import {createAction, props} from '@ngrx/store';
import {PersonDto} from '../model/person.dto';

export namespace PersonActions {
  export const loadPerson = createAction(
    '[Person] Load Person'
  );

  export const loadPersonSuccess = createAction(
    '[Person] Load Person',
    props<{ person: PersonDto }>()
  );
}




