import { TestBed } from '@angular/core/testing';

import { InserimentoAttivitaService } from './inserimento-attivita.service';

describe('InserimentoAttivitaService', () => {
  let service: InserimentoAttivitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InserimentoAttivitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
