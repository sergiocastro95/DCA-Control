import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpacienteComponent } from './detailpaciente.component';

describe('DetailpacienteComponent', () => {
  let component: DetailpacienteComponent;
  let fixture: ComponentFixture<DetailpacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
