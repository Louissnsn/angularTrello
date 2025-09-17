import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then((m) => m.routes) },
  { path: '**', redirectTo: '' }, // fallback
];
