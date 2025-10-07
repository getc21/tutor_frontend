import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../core/services/api.service';
import { Tesis } from '../../../app/core/models/tesis.model';

@Component({
  selector: 'app-tesis-list',
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
        <mat-card-title>Mis Tesis</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          <mat-list-item *ngFor="let tesis of tesisList">
            <h3 matLine>{{tesis.titulo}}</h3>
            <p matLine>Estado: {{tesis.estado_display}}</p>
            <button mat-button [routerLink]="['/tesis', tesis.id]">
              Ver detalles
            </button>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="nuevaTesis()">
          Nueva Tesis
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class TesisListComponent implements OnInit {
  private apiService = inject(ApiService);
  tesisList: Tesis[] = [];

  ngOnInit() {
    this.loadTesis();
  }

  loadTesis() {
    this.apiService.getTesis().subscribe({
      next: (tesis) => this.tesisList = tesis,
      error: (error) => console.error('Error cargando tesis:', error)
    });
  }

  nuevaTesis() {
    // Implementar diálogo para crear nueva tesis
  }
}