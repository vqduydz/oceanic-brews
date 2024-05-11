import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FogotPasswordPage } from './fogot-password.page';

describe('FogotPasswordPage', () => {
  let component: FogotPasswordPage;
  let fixture: ComponentFixture<FogotPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FogotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
