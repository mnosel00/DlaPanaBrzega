import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualProjectDetailsComponentComponent } from './actual-project-details-component.component';

describe('ActualProjectDetailsComponentComponent', () => {
  let component: ActualProjectDetailsComponentComponent;
  let fixture: ComponentFixture<ActualProjectDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualProjectDetailsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualProjectDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
