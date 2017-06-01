import { TestBed, inject } from '@angular/core/testing';

import { NewpacienteService } from './newpaciente.service';

describe('NewpacienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewpacienteService]
    });
  });

  it('should ...', inject([NewpacienteService], (service: NewpacienteService) => {
    expect(service).toBeTruthy();
  }));
});
