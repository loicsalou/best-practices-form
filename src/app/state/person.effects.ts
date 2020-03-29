import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {PersonActions} from './person.actions';
import {PersonService} from '../service/person.service';

@Injectable()
export class PersonEffects {

  @Effect()
  loadPerson$ = this.actions$.pipe(
    ofType(PersonActions.loadPerson),
    switchMap((action) => this.personService.getPerson()),
    map(personDto => PersonActions.loadPersonSuccess({person: personDto}))
  );

  constructor(private actions$: Actions,
              private personService: PersonService) {
  }
}
