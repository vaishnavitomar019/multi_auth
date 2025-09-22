import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { of, throwError } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'getToken']);
    await TestBed.configureTestingModule({
    imports: [LoginComponent],
    providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginForm = component['fb'].group({
      email: ['test@example.com'],
      password: ['password123']
    });

    fixture.detectChanges();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to  register when  goToregister function called', () => {
    component.goToRegister();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/register'])
  })

  it('should not submit if form is invalid', () => {
    component.loginForm.setErrors({ invalid: true });
    component.onSubmit();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should login and navigate to dashboard on success', () => {
    const mockResponse = { token: 'mock-token' };
    authServiceSpy.login.and.returnValue(of(mockResponse));

    spyOn(localStorage, 'setItem');
    component.onSubmit();
    expect(authServiceSpy.login).toHaveBeenCalledWith(component.loginForm.value);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login/success'], {
      queryParams: { token: 'mock-token' }
    });

  });

  it('should set errorMessage on login failure', () => {
    authServiceSpy.login.and.returnValue(throwError(() => ({ error: 'Invalid credentials' })));
    component.onSubmit();
    expect(component.errorMessage).toBe('Invalid email or password');
    expect(component.isSubmitting).toBeFalse();
  });

  it('should redirect to dashboard if token is already present', () => {
    authServiceSpy.getToken.and.returnValue('mock-token');

    component.ngOnInit();

    expect(authServiceSpy.getToken).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

});
