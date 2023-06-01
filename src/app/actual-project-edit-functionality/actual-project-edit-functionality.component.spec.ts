import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualProjectEditFunctionalityComponent } from './actual-project-edit-functionality.component';

describe('ActualProjectEditFunctionalityComponent', () => {
  let component: ActualProjectEditFunctionalityComponent;
  let fixture: ComponentFixture<ActualProjectEditFunctionalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualProjectEditFunctionalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualProjectEditFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
