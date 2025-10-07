import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SeccionTesis } from '../../../core/models/tesis.model';

@Component({
  selector: 'app-seccion-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="editor-container">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Contenido</mat-label>
        <textarea 
          matInput 
          [(ngModel)]="seccion.contenido"
          rows="10"
        ></textarea>
      </mat-form-field>

      <div class="actions">
        <button 
          mat-raised-button 
          color="primary"
          (click)="analizar()"
        >
          <mat-icon>analytics</mat-icon>
          Analizar
        </button>

        <button 
          mat-raised-button 
          color="accent"
          (click)="solicitarSugerencias()"
        >
          <mat-icon>lightbulb</mat-icon>
          Solicitar Sugerencias
        </button>
      </div>
    </div>
  `,
  styles: [`
    .editor-container {
      padding: 16px 0;
    }

    .full-width {
      width: 100%;
    }

    .actions {
      display: flex;
      gap: 16px;
      margin-top: 16px;
    }
  `]
})
export class SeccionEditorComponent {
  @Input() seccion!: SeccionTesis;
  @Output() onAnalizar = new EventEmitter<SeccionTesis>();
  @Output() onSolicitarSugerencias = new EventEmitter<SeccionTesis>();

  analizar() {
    this.onAnalizar.emit(this.seccion);
  }

  solicitarSugerencias() {
    this.onSolicitarSugerencias.emit(this.seccion);
  }
}