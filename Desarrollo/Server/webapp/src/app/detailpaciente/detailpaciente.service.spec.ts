import { TestBed, inject } from '@angular/core/testing';

import { DetailpacienteService } from './detailpaciente.service';

describe('DetailpacienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailpacienteService]
    });
  });

  it('should ...', inject([DetailpacienteService], (service: DetailpacienteService) => {
    expect(service).toBeTruthy();
  }));
});
