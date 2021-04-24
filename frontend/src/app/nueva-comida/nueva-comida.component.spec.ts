import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaComidaComponent } from './nueva-comida.component';

describe('NuevaComidaComponent', () => {
  let component: NuevaComidaComponent;
  let fixture: ComponentFixture<NuevaComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaComidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
