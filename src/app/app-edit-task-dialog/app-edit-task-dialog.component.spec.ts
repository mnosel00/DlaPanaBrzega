import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditTaskDialogComponent } from './app-edit-task-dialog.component';

describe('AppEditTaskDialogComponent', () => {
  let component: AppEditTaskDialogComponent;
  let fixture: ComponentFixture<AppEditTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppEditTaskDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
