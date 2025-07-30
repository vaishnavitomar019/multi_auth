import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { GreetingComponent } from './components/greeting/greeting.component';
import { LoginSuccessComponent } from './auth/login-success/login-success.component';
import { SummarizerComponent } from './components/summarizer/summarizer.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'login/success', component: LoginSuccessComponent },
    {path:'summarizer',component:SummarizerComponent},
    { path: 'greet', component: GreetingComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
];
