import { Routes } from '@angular/router';
import { TesisListComponent } from './tesis-list/tesis-list.component';

export const TESIS_ROUTES: Routes = [
  {
    path: '',
    component: TesisListComponent
  },
  {
    path: 'nueva',
    loadComponent: () => 
      import('./tesis-form/tesis-form.component')
        .then(m => m.TesisFormComponent)
  },
  {
    path: ':id/editar',
    loadComponent: () => 
      import('./tesis-form/tesis-form.component')
        .then(m => m.TesisFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => 
      import('./tesis-detail/tesis-detail.component')
        .then(m => m.TesisDetailComponent)
  }
];