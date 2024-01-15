import { Routes } from '@angular/router';
// Guards
import { userScoreGuard } from '@core/guards/user-score.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    canDeactivate: [() => userScoreGuard()],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  }
];
