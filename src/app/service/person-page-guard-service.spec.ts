import {async, TestBed} from '@angular/core/testing';

import {PersonPageGuardService} from '../../service/person-page-guard.service';

describe('PersonPageGuardService', () => {
  // tslint:disable-next-line:prefer-const
  let guard: PersonPageGuardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     declarations: [PersonPageGuardService]
                                   })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPageGuardService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
