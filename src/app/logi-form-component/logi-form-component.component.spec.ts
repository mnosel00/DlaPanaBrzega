import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogiFormComponentComponent } from './logi-form-component.component';

describe('LogiFormComponentComponent', () => {
  let component: LogiFormComponentComponent;
  let fixture: ComponentFixture<LogiFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogiFormComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogiFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
