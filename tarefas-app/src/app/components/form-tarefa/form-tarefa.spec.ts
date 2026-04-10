import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTarefa } from './form-tarefa';

describe('FormTarefa', () => {
  let component: FormTarefa;
  let fixture: ComponentFixture<FormTarefa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTarefa],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTarefa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
