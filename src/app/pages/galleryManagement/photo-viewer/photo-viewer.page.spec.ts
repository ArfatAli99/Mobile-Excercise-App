import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoViewerPage } from './photo-viewer.page';

describe('PhotoViewerPage', () => {
  let component: PhotoViewerPage;
  let fixture: ComponentFixture<PhotoViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoViewerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
