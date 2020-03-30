import {ControlValueAccessor} from '@angular/forms';

export class NestedFormAdapter<T> implements ControlValueAccessor {

  onTouch = () => {
  };
  onChange = (formValue: T) => {
  };
  private isDisabled = false;

  constructor() {
  }

  registerOnChange(fn: (T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: T): void {
    throw new Error('la méthode writeValue doit être implémentée dans les sous-classes de NestedFormAdapter');
  }

}
