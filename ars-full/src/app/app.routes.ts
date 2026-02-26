// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [publicGuard]
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage),
    canActivate: [publicGuard]
  },
  {
    path: 'new-password',
    loadComponent: () => import('./pages/new-password/new-password.page').then(m => m.NewPasswordPage),
    canActivate: [publicGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [authGuard]
  },
  // Placeholder routes — create pages as needed
  { path: 'orders',       loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage), canActivate: [authGuard] },
  { path: 'complaints',   loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage), canActivate: [authGuard] },
  { path: 'stocks',       loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage), canActivate: [authGuard] },
  { path: 'schemes',      loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage), canActivate: [authGuard] },
  { path: 'certificates', loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage), canActivate: [authGuard] },
  { path: 'branding',     loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage), canActivate: [authGuard] },
  {
    path: '**',
    redirectTo: 'login'
  }
];
