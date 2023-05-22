import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectComponentComponent } from './delete-project-component.component';

describe('DeleteProjectComponentComponent', () => {
  let component: DeleteProjectComponentComponent;
  let fixture: ComponentFixture<DeleteProjectComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProjectComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProjectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
