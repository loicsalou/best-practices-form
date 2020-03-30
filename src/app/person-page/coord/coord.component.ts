import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit, StaticProvider} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {FormUtils} from '../../formutils/form-utils';
import {NestedFormAdapter} from '../../formutils/nested-form.adapter';
import {CoordForm} from './coord.form';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export const NESTED_FORM_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CoordComponent),
  multi: true
};
export const NESTED_FORM_VALIDATORS: StaticProvider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CoordComponent),
  multi: true
};

@Component({
             selector: 'app-coord',
             templateUrl: './coord.component.html',
             styleUrls: ['./coord.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
             providers: [
               NESTED_FORM_VALUE_ACCESSOR,
               NESTED_FORM_VALIDATORS
             ]
           })
export class CoordComponent extends NestedFormAdapter<CoordForm> implements OnInit, OnDestroy, Validator {
  formGroup: FormGroup;
  private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.buildFormGroup();
    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      v => {
        this.onChange(v);
      }
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  writeValue(coordForm: CoordForm): void {
    if (coordForm) {
      this.formGroup.patchValue(coordForm);
    } else {
      this.formGroup.reset();
    }
  }

  private buildFormGroup(): FormGroup {
    const fieldValues: CoordForm = {
      phone: null,
      mobile: null,
      email: null
    };
    const fieldValidators: FormUtils.FormValidators<CoordForm> = {
      email: Validators.email
    };
    const formDescription = FormUtils.mergeFieldsAndValidators<CoordForm>(fieldValues, fieldValidators);
    return this.fb.group(formDescription, {updateOn: 'blur'});
  }
}
