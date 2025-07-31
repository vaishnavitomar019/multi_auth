import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { LoginSuccessComponent } from './login-success.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginSuccessComponent', () => {
  let component: LoginSuccessComponent;
  let fixture: ComponentFixture<LoginSuccessComponent>;
  let routerSpy: jasmine.SpyObj<Router>;


  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginSuccessComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  navigate to login  if token is missing', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.queryParams = of({});
    component.ngOnInit();
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  })

  it('should navigate to  dashbord if token is valid', () => {
    const mockToken = 'mock-jwt-token-123';
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.queryParams = of({ token: mockToken });
    component.ngOnInit();
    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(component.loading).toBe(true);
    tick(1000);
    expect(component.loading).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  })
});
