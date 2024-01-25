import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupsegnalazioneComponent } from './popupsegnalazione.component';

describe('PopupsegnalazioneComponent', () => {
  let component: PopupsegnalazioneComponent;
  let fixture: ComponentFixture<PopupsegnalazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupsegnalazioneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupsegnalazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
