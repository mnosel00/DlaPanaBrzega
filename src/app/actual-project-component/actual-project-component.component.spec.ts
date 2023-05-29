import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualProjectComponentComponent } from './actual-project-component.component';

describe('ActualProjectComponentComponent', () => {
  let component: ActualProjectComponentComponent;
  let fixture: ComponentFixture<ActualProjectComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualProjectComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualProjectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
