import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../core/services/api.service';
import { SeccionTesis } from '../../../core/models/tesis.model';

@Component({
  selector: 'app-seccion-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule
  ],
  template: `
    <mat-card *ngIf="seccion">
      <mat-card-title>{{ seccion.tipo_seccion }}</mat-card-title>
      <mat-card-content>
        <p>{{ seccion.contenido }}</p>
        <!-- Agrega aquí más campos según tu modelo -->
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['/secciones', seccion.id, 'editar']">
          Editar
        </button>
        <button mat-button [routerLink]="['/secciones']">
          Volver a la lista
        </button>
      </mat-card-actions>
    </mat-card>
    <p *ngIf="!seccion">Cargando sección...</p>
  `
})
export class SeccionDetailComponent implements OnInit {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  seccion?: SeccionTesis;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getSeccionById(id).subscribe({
        next: (seccion) => this.seccion = seccion,
        error: (error) => console.error('Error cargando sección:', error)
      });
    }
  }
}