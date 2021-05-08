import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComidasComponent } from './editor-comidas.component';

describe('EditorComidasComponent', () => {
  let component: EditorComidasComponent;
  let fixture: ComponentFixture<EditorComidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorComidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
