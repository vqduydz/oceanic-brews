import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenusPage } from './menus.page';

describe('MenusPage', () => {
  let component: MenusPage;
  let fixture: ComponentFixture<MenusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
