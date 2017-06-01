import { TestBed, inject } from '@angular/core/testing';

import { HrService } from './hr.service';

describe('HrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrService]
    });
  });

  it('should ...', inject([HrService], (service: HrService) => {
    expect(service).toBeTruthy();
  }));
});
