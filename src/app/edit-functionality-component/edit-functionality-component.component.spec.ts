import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFunctionalityComponentComponent } from './edit-functionality-component.component';

describe('EditFunctionalityComponentComponent', () => {
  let component: EditFunctionalityComponentComponent;
  let fixture: ComponentFixture<EditFunctionalityComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFunctionalityComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFunctionalityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
