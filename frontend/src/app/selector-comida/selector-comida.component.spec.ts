import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorComidaComponent } from './selector-comida.component';

describe('SelectorComidaComponent', () => {
  let component: SelectorComidaComponent;
  let fixture: ComponentFixture<SelectorComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorComidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
