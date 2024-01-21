import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotAttivitaComponent } from './prenot-attivita.component';

describe('PrenotAttivitaComponent', () => {
  let component: PrenotAttivitaComponent;
  let fixture: ComponentFixture<PrenotAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenotAttivitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrenotAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
