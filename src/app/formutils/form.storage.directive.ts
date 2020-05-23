import {Directive, HostListener, Input, OnInit, Self} from '@angular/core';
import {ControlContainer} from '@angular/forms';
import {debounceTime, filter, take} from 'rxjs/operators';
import {fromEvent, merge, Subject} from 'rxjs';
import {StorageService} from './storage.service';

@Directive({
             selector: 'form[formGroup][save]'
           })
export class FormStorageDirective implements OnInit {
  @Input() save: string;
  @Input() saveStrategy: 'change' | 'unload' = 'unload';

  private destroy = new Subject();
  private destroy$ = this.destroy.asObservable();

  constructor(@Self() private container: ControlContainer, private storage: StorageService) {
  }

  private get key() {
    return `${this.save}-form`;
  }

  private get group() {
    return this.container.control;
  }

  @HostListener('submit')
  onSubmit() {
    this.storage.removeItem(this.key);
  }

  async ngOnInit() {
    this.saveStrategy === 'unload' ? this.unloadStrategy() : this.changeStrategy();

    const storageValue = await this.storage.getItem(this.key);
    if (storageValue) {
      this.group.patchValue(storageValue);
    }
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  private unloadStrategy() {
    merge(
      fromEvent(window, 'beforeunload'),
      this.destroy$
    ).pipe(
      filter(() => this.group.dirty),
      take(1)
    ).subscribe(() => this.saveValue(this.group.value));
  }

  private changeStrategy() {
    this.group.valueChanges.pipe(debounceTime(400))
      .subscribe(value => this.saveValue(value));
  }

  private saveValue(value) {
    this.storage.setItem(this.key, value);
  }

}
