import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndietroPopupComponent } from './indietro-popup.component';

describe('IndietroPopupComponent', () => {
  let component: IndietroPopupComponent;
  let fixture: ComponentFixture<IndietroPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndietroPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndietroPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
