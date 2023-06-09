import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditUserDialogComponent } from './app-edit-user-dialog.component';

describe('AppEditUserDialogComponent', () => {
  let component: AppEditUserDialogComponent;
  let fixture: ComponentFixture<AppEditUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppEditUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppEditUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
