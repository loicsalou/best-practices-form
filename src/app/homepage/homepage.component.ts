import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export type FadeState = 'visible' | 'hidden';

@Component({
             selector: 'app-homepage',
             templateUrl: './homepage.component.html',
             styleUrls: ['./homepage.component.scss']
           })
export class HomepageComponent implements OnInit {

  block1 = true;
  state: FadeState;
  formGroup: FormGroup;
  fieldToggle = true;
  // tslint:disable-next-line: variable-name
  private _show: boolean;

  constructor(private fb: FormBuilder) {
  }

  get show() {
    return this._show;
  }

  @Input()
  set show(value: boolean) {
    if (value) {
      // show the content and set it's state to trigger fade in animation
      this._show = value;
      this.state = 'visible';
    } else {
      // just trigger the fade out animation
      this.state = 'hidden';
    }
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
                                     nom: [null, Validators.required],
                                     prenom: [null, Validators.required]
                                   });
  }

  toggle() {
    this.block1 = !this.block1;
  }
}
