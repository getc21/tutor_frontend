import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tesis',
    loadChildren: () => 
      import('./features/tesis/tesis.routes')
        .then(m => m.TESIS_ROUTES)
  },
  {
    path: 'secciones',
    loadChildren: () => 
      import('./features/seccion/seccion.routes')
        .then(m => m.SECCIONES_ROUTES)
  },
  {
    path: 'retroalimentaciones',
    loadComponent: () => 
      import('./features/retroalimentacion/retroalimentacion-list/retroalimentacion-list.component')
        .then(m => m.RetroalimentacionListComponent)
  },
  {
    path: 'tutor',
    loadComponent: () =>
      import('./features/tutor/chat-tutor/chat-tutor.component')
        .then(m => m.ChatTutorComponent)
  },
  {
    path: '',
    redirectTo: 'tesis',
    pathMatch: 'full'
  }
];