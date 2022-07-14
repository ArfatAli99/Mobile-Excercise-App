import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingGroupsPage } from './pending-groups.page';

describe('PendingGroupsPage', () => {
  let component: PendingGroupsPage;
  let fixture: ComponentFixture<PendingGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingGroupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
