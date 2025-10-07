import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';
import { Tesis } from '../../../core/models/tesis.model';

@Component({
  selector: 'app-tesis-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule, 
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Mis Tesis</mat-card-title>
        <button mat-mini-fab color="primary" (click)="nuevaTesis()" matTooltip="Nueva Tesis">
          <mat-icon>add</mat-icon>
        </button>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          <mat-list-item *ngFor="let tesis of tesisList">
            <div matLine>
              <strong>{{tesis.titulo}}</strong>
              <span class="estado" [ngClass]="tesis.estado">{{tesis.estado_display}}</span>
            </div>
            <div matLine>
              <button mat-stroked-button color="primary" [routerLink]="['/tesis', tesis.id]">Ver detalles</button>
              <button mat-icon-button color="accent" [routerLink]="['/tesis', tesis.id, 'editar']" matTooltip="Editar">
                <mat-icon>edit</mat-icon>
              </button>
            </div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .estado { margin-left: 16px; font-size: 0.9em; }
    mat-card-header { display: flex; justify-content: space-between; align-items: center; }
    mat-list-item { display: flex; flex-direction: column; align-items: flex-start; }
    mat-list-item div[matLine]:last-child { margin-top: 8px; }
  `]
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