import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMeetingsPage } from './all-meetings.page';

describe('AllMeetingsPage', () => {
  let component: AllMeetingsPage;
  let fixture: ComponentFixture<AllMeetingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMeetingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMeetingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
