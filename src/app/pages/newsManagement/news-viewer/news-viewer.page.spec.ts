import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsViewerPage } from './news-viewer.page';

describe('NewsViewerPage', () => {
  let component: NewsViewerPage;
  let fixture: ComponentFixture<NewsViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsViewerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
