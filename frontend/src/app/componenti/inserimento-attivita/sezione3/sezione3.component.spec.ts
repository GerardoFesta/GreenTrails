import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sezione3Component } from './sezione3.component';

describe('Sezione3Component', () => {
  let component: Sezione3Component;
  let fixture: ComponentFixture<Sezione3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sezione3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sezione3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
