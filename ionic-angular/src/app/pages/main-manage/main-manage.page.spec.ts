import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainManagePage } from './main-manage.page';

describe('MainManagePage', () => {
  let component: MainManagePage;
  let fixture: ComponentFixture<MainManagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
