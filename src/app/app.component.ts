import {Component, OnInit} from '@angular/core';
import {ObINavigationLink} from '@oblique/oblique';
import {Store} from '@ngrx/store';
import {PersonActions} from './state/person.actions';
import {State} from './state';

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.scss']
           })
export class AppComponent implements OnInit {
  navigation: ObINavigationLink[] = [];
  title = 'nested-forms';

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.dispatch(PersonActions.loadPerson());
  }

}
