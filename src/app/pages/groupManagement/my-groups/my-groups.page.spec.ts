import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGroupsPage } from './my-groups.page';

describe('MyGroupsPage', () => {
  let component: MyGroupsPage;
  let fixture: ComponentFixture<MyGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGroupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
