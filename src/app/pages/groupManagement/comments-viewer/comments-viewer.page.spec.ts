import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsViewerPage } from './comments-viewer.page';

describe('CommentsViewerPage', () => {
  let component: CommentsViewerPage;
  let fixture: ComponentFixture<CommentsViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsViewerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
