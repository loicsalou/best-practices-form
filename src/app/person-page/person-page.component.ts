import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../state';
import {Selectors} from '../state/get-person.selectors';
import {distinctUntilChanged, filter, map, takeUntil, tap} from 'rxjs/operators';
import {PersonActions} from '../state/person.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonPageForm} from './person-page.form';
import {PersonPageMappers} from './person-page.mappers';
import {Observable, Subject} from 'rxjs';

@Component({
             selector: 'app-person-page',
             templateUrl: './person-page.component.html',
             styleUrls: ['./person-page.component.scss']
           })
export class PersonPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formValue$: Observable<PersonPageForm>;
  private destroyed$ = new Subject<void>();

  constructor(private store: Store<State>, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.formValue$ = this.form.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap(formValue => {
        console.info('la form a été modifiée' + JSON.stringify(formValue));
      })
    );
    this.store.pipe(
      select(Selectors.getPersonState),
      map(personState => personState.currentPerson),
      distinctUntilChanged((prev, cur) => prev?.id === cur?.id),
      filter(person => !!person)
    ).subscribe(
      dto => {
        const formObject = PersonPageMappers.toForm(dto);
        this.form.patchValue(formObject);
      }
    );
    this.store.dispatch(PersonActions.loadPerson());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private buildForm(): FormGroup {
    const gr = this.fb.group({
                               coordData: [null],
                               civilData: [null, Validators.required]
                             });
// TODO ce qui suit devrait fonctionner mais bbizarrement les valueChange en remontent plus si on utilise ça ?!?!??!?
//    const values: PersonPageForm = {
//      coordData: null,
//      civilData: null
//    };
//    const validators: FormUtils.FormValidators<PersonPageForm> = {
//      civilData: Validators.required
//    };
//    const formDescription = FormUtils.mergeFieldsAndValidators(values, validators);
//    const fg = this.fb.group(formDescription, {updateOn: 'blur'});
    return gr;
  }
}
