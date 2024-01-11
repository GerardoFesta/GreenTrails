import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappaAttivitaComponent } from './mappa-attivita.component';

describe('MappaAttivitaComponent', () => {
  let component: MappaAttivitaComponent;
  let fixture: ComponentFixture<MappaAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappaAttivitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MappaAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
