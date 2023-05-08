import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFunctionalityComponentComponent } from './create-functionality-component.component';

describe('CreateFunctionalityComponentComponent', () => {
  let component: CreateFunctionalityComponentComponent;
  let fixture: ComponentFixture<CreateFunctionalityComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFunctionalityComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFunctionalityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
