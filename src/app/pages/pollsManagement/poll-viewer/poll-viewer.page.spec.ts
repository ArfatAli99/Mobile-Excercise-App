import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollViewerPage } from './poll-viewer.page';

describe('PollViewerPage', () => {
  let component: PollViewerPage;
  let fixture: ComponentFixture<PollViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollViewerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
