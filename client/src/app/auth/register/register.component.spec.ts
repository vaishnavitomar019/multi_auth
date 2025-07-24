import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register'])
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.register() with form data', () => {
    const mockFormData = { username: 'test', email: 'test@example.com', password: '123456' };
    const submission = { data: mockFormData };
    authServiceSpy.register.and.returnValue(of({ message: 'Success' }));

    component.onSubmit(submission);
    expect(authServiceSpy.register).toHaveBeenCalledWith(mockFormData);
  });


  it('should NOT navigate if registration fails', () => {
    const mockFormData = { email: 'test@example.com', password: '123456' };
    const submission = { data: mockFormData };
    authServiceSpy.register.and.returnValue(throwError(() => ({ error: 'Registration failed' })));

    component.onSubmit(submission);

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

});
