import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagePage } from './manage.page';

describe('ManagePage', () => {
  let component: ManagePage;
  let fixture: ComponentFixture<ManagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
