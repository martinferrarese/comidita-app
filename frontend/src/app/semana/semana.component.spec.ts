import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SemanaComponent } from './semana.component';

fdescribe('SemanaComponent', () => {
  let component: SemanaComponent;
  let fixture: ComponentFixture<SemanaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanaComponent ],
      imports: [ HttpClientTestingModule ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(SemanaComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
