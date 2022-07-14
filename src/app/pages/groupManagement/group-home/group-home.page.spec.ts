import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupHomePage } from './group-home.page';

describe('GroupHomePage', () => {
  let component: GroupHomePage;
  let fixture: ComponentFixture<GroupHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
