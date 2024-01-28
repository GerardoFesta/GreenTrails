/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItinerarioService } from './itinerario.service';

describe('Service: Itinerario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItinerarioService]
    });
  });

  it('should ...', inject([ItinerarioService], (service: ItinerarioService) => {
    expect(service).toBeTruthy();
  }));
});
