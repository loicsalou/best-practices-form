import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {NestedFormAdapter} from '../../formutils/nested-form.adapter';
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
import {CivilForm} from './civil.form';
import {FormUtils} from '../../formutils/form-utils';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {DateAdapter} from '@angular/material/core';
import {Moment} from 'moment';

@Component({
             selector: 'app-civil',
             templateUrl: './civil.component.html',
             styleUrls: ['./civil.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
             providers: [
               {
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: CivilComponent,
                 multi: true
               },
               {
                 provide: NG_VALIDATORS,
                 useExisting: CivilComponent,
                 multi: true
               }
             ]
           })
export class CivilComponent extends NestedFormAdapter<CivilForm> implements OnInit, OnDestroy, Validator {
  formGroup: FormGroup;
  private destroyed$ = new Subject<void>();
  private currentLang = 'fr';

  constructor(private fb: FormBuilder, private translateService: TranslateService, private dateAdapter: DateAdapter<Moment>) {
    super();
    this.currentLang = this.translateService.currentLang;
    this.dateAdapter.setLocale(this.currentLang);
    this.translateService.onLangChange.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      lang => {
        this.currentLang = lang.lang;
        this.dateAdapter.setLocale(lang.lang);
      }
    );
  }

  ngOnInit(): void {
    this.formGroup = this.buildFormGroup();
    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (v: CivilForm) => {
        if (this.onChange) {
          this.onChange(v);
        }
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

  writeValue(civilForm: CivilForm): void {
    if (civilForm) {
      this.formGroup.patchValue(civilForm);
    } else {
      this.formGroup.reset();
    }
  }

  private buildFormGroup(): FormGroup {
    const fieldValues: CivilForm = {
      prenom: null,
      nom: null,
      dateNaissance: null
    };
    const fieldValidators: FormUtils.FormValidators<CivilForm> = {
      prenom: [Validators.minLength(1), Validators.maxLength(50)],
      nom: [Validators.minLength(1), Validators.maxLength(50)],
      dateNaissance: null
    };
    const formDescription = FormUtils.mergeFieldsAndValidators<CivilForm>(fieldValues, fieldValidators);
    return this.fb.group(formDescription, {updateOn: 'blur'});
  }
}
