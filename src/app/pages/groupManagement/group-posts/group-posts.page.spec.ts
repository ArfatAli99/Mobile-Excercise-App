import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPostsPage } from './group-posts.page';

describe('GroupPostsPage', () => {
  let component: GroupPostsPage;
  let fixture: ComponentFixture<GroupPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
