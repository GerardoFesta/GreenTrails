import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfermaItinerarioComponent } from './popup-conferma-itinerario.component';

describe('PopupConfermaItinerarioComponent', () => {
  let component: PopupConfermaItinerarioComponent;
  let fixture: ComponentFixture<PopupConfermaItinerarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupConfermaItinerarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupConfermaItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
