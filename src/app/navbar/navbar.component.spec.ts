import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let link: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    link = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have link for home', ()=> {
    let homeLink = link.query(By.css('a[mat-flat-button]'));
    expect(homeLink.nativeElement.textContent).toBe('Home');
  })

});
