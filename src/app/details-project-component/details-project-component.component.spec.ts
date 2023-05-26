import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjectComponentComponent } from './details-project-component.component';

describe('DetailsProjectComponentComponent', () => {
  let component: DetailsProjectComponentComponent;
  let fixture: ComponentFixture<DetailsProjectComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsProjectComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProjectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
