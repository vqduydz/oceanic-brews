import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountSettingPage } from './account-setting.page';

describe('AccountSettingPage', () => {
  let component: AccountSettingPage;
  let fixture: ComponentFixture<AccountSettingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
