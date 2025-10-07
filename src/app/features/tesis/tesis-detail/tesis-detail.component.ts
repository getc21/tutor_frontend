import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ApiService } from '../../../core/services/api.service';
import { Tesis, SeccionTesis } from '../../../core/models/tesis.model';
import { SeccionEditorComponent } from '../../seccion/section-editor/seccion-editor.component';

@Component({
  selector: 'app-tesis-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    SeccionEditorComponent
  ],
  template: `
    <mat-card *ngIf="tesis">
      <mat-card-header>
        <mat-card-title>{{tesis.titulo}}</mat-card-title>
        <mat-card-subtitle>
          Estado: {{tesis.estado_display}}
          <mat-progress-bar
            mode="determinate"
            [value]="progreso"
          ></mat-progress-bar>
        </mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <mat-accordion>
          @for (seccion of tesis.secciones; track seccion.id) {
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>
                  {{seccion.tipo_seccion}}
                </mat-panel-title>
                <mat-panel-description>
                  @if (seccion.retroalimentaciones.length > 0) {
                    <mat-icon color="warn">feedback</mat-icon>
                    {{seccion.retroalimentaciones.length}} comentarios
                  }
                </mat-panel-description>
              </mat-expansion-panel-header>

              <app-seccion-editor
                [seccion]="seccion"
                (onAnalizar)="analizarSeccion($event)"
                (onSolicitarSugerencias)="solicitarSugerencias($event)"
              ></app-seccion-editor>

              <mat-divider></mat-divider>

              @if (seccion.retroalimentaciones.length > 0) {
                <div class="retroalimentaciones">
                  <h3>Retroalimentación</h3>
                  @for (retro of seccion.retroalimentaciones; track retro.id) {
                    <div class="retro-item" [class]="retro.prioridad">
                      <mat-icon>{{getRetroIcon(retro.prioridad)}}</mat-icon>
                      <p>{{retro.contenido}}</p>
                    </div>
                  }
                </div>
              }
            </mat-expansion-panel>
          }
        </mat-accordion>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button routerLink="/tesis">
          <mat-icon>arrow_back</mat-icon>
          Volver
        </button>
        <button mat-raised-button color="primary" (click)="nuevaSeccion()">
          <mat-icon>add</mat-icon>
          Nueva Sección
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 1200px;
      margin: 20px auto;
    }

    mat-card-subtitle {
      margin-bottom: 20px;
    }

    .retroalimentaciones {
      margin-top: 16px;
    }

    .retro-item {
      display: flex;
      align-items: flex-start;
      padding: 8px;
      margin: 8px 0;
      border-radius: 4px;

      &.alta {
        background-color: rgba(244, 67, 54, 0.1);
      }

      &.media {
        background-color: rgba(255, 152, 0, 0.1);
      }

      &.baja {
        background-color: rgba(76, 175, 80, 0.1);
      }

      mat-icon {
        margin-right: 8px;
        margin-top: 2px;
      }
    }
  `]
})
export class TesisDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  tesis: Tesis | null = null;
  progreso: number = 0;

  ngOnInit() {
    const tesisId = this.route.snapshot.paramMap.get('id');
    if (tesisId) {
      this.loadTesis(+tesisId);
    }
  }

  loadTesis(id: number) {
    this.apiService.getTesisById(id).subscribe({
      next: (tesis) => {
        this.tesis = tesis;
        this.calcularProgreso();
      },
      error: (error) => console.error('Error cargando tesis:', error)
    });
  }

  calcularProgreso() {
    if (!this.tesis?.secciones.length) return;
    
    const totalSecciones = this.tesis.secciones.length;
    const seccionesCompletas = this.tesis.secciones.filter(
      s => !s.retroalimentaciones.some(r => !r.atendida)
    ).length;

    this.progreso = (seccionesCompletas / totalSecciones) * 100;
  }

  analizarSeccion(seccion: SeccionTesis) {
    this.apiService.analizarSeccion(seccion.id).subscribe({
      next: (resultado) => {
        // Actualizar retroalimentaciones
        this.loadTesis(this.tesis!.id);
      },
      error: (error) => console.error('Error analizando sección:', error)
    });
  }

  solicitarSugerencias(seccion: SeccionTesis) {
    this.apiService.solicitarSugerencias(seccion.id).subscribe({
      next: (sugerencias) => {
        // Manejar sugerencias
      },
      error: (error) => console.error('Error solicitando sugerencias:', error)
    });
  }

  getRetroIcon(prioridad: string): string {
    switch (prioridad) {
      case 'alta': return 'error';
      case 'media': return 'warning';
      case 'baja': return 'info';
      default: return 'feedback';
    }
  }

  nuevaSeccion() {
    // Implementar diálogo para nueva sección
  }
}