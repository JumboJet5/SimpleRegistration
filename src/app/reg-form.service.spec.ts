import { TestBed, inject } from '@angular/core/testing';

import { RegFormService } from './reg-form.service';

describe('RegFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegFormService]
    });
  });

  it('should be created', inject([RegFormService], (service: RegFormService) => {
    expect(service).toBeTruthy();
  }));
});
