import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainClientPage } from './main-client.page';

describe('MainClientPage', () => {
  let component: MainClientPage;
  let fixture: ComponentFixture<MainClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
