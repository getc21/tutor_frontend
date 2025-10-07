import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

import { ApiService } from '../../../core/services/api.service';
import { Retroalimentacion } from '../../../core/models/tesis.model';

@Component({
  selector: 'app-retroalimentacion-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          Retroalimentaciones Pendientes
          <mat-chip-listbox>
            <mat-chip [matBadge]="countByPriority('alta')" matBadgeColor="warn">
              Alta
            </mat-chip>
            <mat-chip [matBadge]="countByPriority('media')" matBadgeColor="accent">
              Media
            </mat-chip>
            <mat-chip [matBadge]="countByPriority('baja')" matBadgeColor="primary">
              Baja
            </mat-chip>
          </mat-chip-listbox>
        </mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <table mat-table [dataSource]="retroalimentaciones" class="mat-elevation-z2">
          <!-- Prioridad Column -->
          <ng-container matColumnDef="prioridad">
            <th mat-header-cell *matHeaderCellDef>Prioridad</th>
            <td mat-cell *matCellDef="let retro">
              <mat-icon [color]="getPrioridadColor(retro.prioridad)">
                {{getPrioridadIcon(retro.prioridad)}}
              </mat-icon>
            </td>
          </ng-container>

          <!-- Contenido Column -->
          <ng-container matColumnDef="contenido">
            <th mat-header-cell *matHeaderCellDef>Retroalimentación</th>
            <td mat-cell *matCellDef="let retro">{{retro.contenido}}</td>
          </ng-container>

          <!-- Sección Column -->
          <ng-container matColumnDef="seccion">
            <th mat-header-cell *matHeaderCellDef>Sección</th>
            <td mat-cell *matCellDef="let retro">
              <a [routerLink]="['/tesis', getTesisId(retro)]">
                {{getSeccionTipo(retro)}}
              </a>
            </td>
          </ng-container>

          <!-- Fecha Column -->
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef>Fecha</th>
            <td mat-cell *matCellDef="let retro">
              {{retro.fecha_creacion | date:'short'}}
            </td>
          </ng-container>

          <!-- Acciones Column -->
          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let retro">
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="marcarAtendida(retro)">
                  <mat-icon>check</mat-icon>
                  <span>Marcar como atendida</span>
                </button>
                <button mat-menu-item (click)="verDetalles(retro)">
                  <mat-icon>visibility</mat-icon>
                  <span>Ver detalles</span>
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 1200px;
      margin: 20px auto;
    }

    table {
      width: 100%;
    }

    mat-chip-listbox {
      margin-left: 16px;
    }

    .mat-column-prioridad {
      width: 80px;
    }

    .mat-column-acciones {
      width: 80px;
    }

    .mat-column-fecha {
      width: 150px;
    }
  `]
})
export class RetroalimentacionListComponent implements OnInit {
  private apiService = inject(ApiService);
  
  retroalimentaciones: Retroalimentacion[] = [];
  displayedColumns = ['prioridad', 'contenido', 'seccion', 'fecha', 'acciones'];

  ngOnInit() {
    this.loadRetroalimentaciones();
  }

  loadRetroalimentaciones() {
    this.apiService.getRetroalimentacionesPendientes().subscribe({
      next: (retros) => this.retroalimentaciones = retros,
      error: (error) => console.error('Error cargando retroalimentaciones:', error)
    });
  }

  countByPriority(prioridad: string): number {
    return this.retroalimentaciones.filter(r => r.prioridad === prioridad).length;
  }

  getPrioridadColor(prioridad: string): string {
    switch (prioridad) {
      case 'alta': return 'warn';
      case 'media': return 'accent';
      case 'baja': return 'primary';
      default: return '';
    }
  }

  getPrioridadIcon(prioridad: string): string {
    switch (prioridad) {
      case 'alta': return 'error';
      case 'media': return 'warning';
      case 'baja': return 'info';
      default: return 'help';
    }
  }

  getTesisId(retro: Retroalimentacion): number {
    // Implementar lógica para obtener el ID de la tesis
    return 0;
  }

  getSeccionTipo(retro: Retroalimentacion): string {
    // Implementar lógica para obtener el tipo de sección
    return 'Sección';
  }

  marcarAtendida(retro: Retroalimentacion) {
    this.apiService.marcarRetroalimentacionAtendida(retro.id).subscribe({
      next: () => this.loadRetroalimentaciones(),
      error: (error) => console.error('Error marcando retroalimentación:', error)
    });
  }

  verDetalles(retro: Retroalimentacion) {
    // Implementar diálogo de detalles
  }
}