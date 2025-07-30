import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const mockUser = { name: 'Vaishnavi', email: 'vaishnavi@example.com' };
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getProfile', 'logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy.getProfile.and.returnValue(of({ user: mockUser }));

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should set user on successful profile fetch', () => {
    const mockUser = { name: 'Vaishnavi', email: 'vaishnavi@example.com' };
    authServiceSpy.getProfile.and.returnValue(of({ user: mockUser }));

    component.ngOnInit();

    expect(authServiceSpy.getProfile).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

   it('should logout and navigate to /login', () => {
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

});
