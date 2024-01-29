import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModificaComponent } from './popup-modifica.component';

describe('PopupModificaComponent', () => {
  let component: PopupModificaComponent;
  let fixture: ComponentFixture<PopupModificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModificaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
