import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../state';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Selectors} from '../state/get-person.selectors';
import {ObNotificationService} from '@oblique/oblique';
import getCurrentPerson = Selectors.getCurrentPerson;

@Injectable({providedIn: 'root'})
export class PersonPageGuardService implements CanActivate {
  constructor(private store: Store<State>, private notificationService: ObNotificationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(getCurrentPerson),
      tap(person => {
        console.log(JSON.stringify(person));
      }),
      map(person => !!person || true),
      tap(response => {
        if (!response) {
          this.notificationService.error('Navigation refusée');
        }
      })
    );
  }
}
