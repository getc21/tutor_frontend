import { Routes } from '@angular/router';
import { SeccionListComponent } from './seccion-list/seccion-list.component';

export const SECCIONES_ROUTES: Routes = [
  {
    path: '',
    component: SeccionListComponent
  },
  {
    path: 'nueva',
    loadComponent: () =>
      import('./seccion-form/seccion-form.component')
        .then(m => m.SeccionFormComponent)
  },
  {
    path: ':id/editar',
    loadComponent: () =>
      import('./seccion-form/seccion-form.component')
        .then(m => m.SeccionFormComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./seccion-detail/seccion-detail.component')
        .then(m => m.SeccionDetailComponent)
  }
];