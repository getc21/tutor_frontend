import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../core/services/api.service';
import { SeccionTesis } from '../../../core/models/tesis.model';

@Component({
  selector: 'app-seccion-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Secciones</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          <mat-list-item *ngFor="let seccion of secciones">
            <h3 matLine>{{seccion.tipo_seccion}}</h3>
            <p matLine>{{seccion.contenido}}</p>
            <button mat-button [routerLink]="['/secciones', seccion.id]">
              Ver detalles
            </button>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['/secciones/nueva']">
          Nueva Sección
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class SeccionListComponent implements OnInit {
  private apiService = inject(ApiService);
  secciones: SeccionTesis[] = [];

  ngOnInit() {
    this.loadSecciones();
  }

  loadSecciones() {
    this.apiService.getSecciones().subscribe({
      next: (secciones) => this.secciones = secciones,
      error: (error) => console.error('Error cargando secciones:', error)
    });
  }
}