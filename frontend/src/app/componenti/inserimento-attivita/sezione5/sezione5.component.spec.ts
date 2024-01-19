import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sezione5Component } from './sezione5.component';

describe('Sezione5Component', () => {
  let component: Sezione5Component;
  let fixture: ComponentFixture<Sezione5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sezione5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sezione5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
