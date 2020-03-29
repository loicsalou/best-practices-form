import {Injectable} from '@angular/core';
import {PersonDto} from '../model/person.dto';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PersonService {
  public getPerson(): Observable<PersonDto> {
    return of({
                id: 1,
                firstname: 'Loïc',
                lastName: 'Salou',
                birthdate: '19690316',
                sex: 'male',
                email: 'loic.salou@zas.admin.ch',
                phone: '0033450578925',
                mobile: '0033631089038',
                more: '',
                andMore: ''
              }
    ).pipe(
      delay(1000) // on simule un temps d'attente
    );
  }
}
