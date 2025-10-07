import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Tesis } from '../../../core/models/tesis.model';

@Component({
  selector: 'app-tesis-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <mat-card>
      <mat-card-title>{{tesis?.id ? 'Editar Tesis' : 'Nueva Tesis'}}</mat-card-title>
      <form (ngSubmit)="guardar()">
        <mat-form-field class="full-width">
          <mat-label>Título</mat-label>
          <input matInput [(ngModel)]="formData.titulo" name="titulo" required>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Estado</mat-label>
          <input matInput [(ngModel)]="formData.estado" name="estado" required>
        </mat-form-field>
        <div class="actions">
          <button mat-raised-button color="primary" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </mat-card>
  `,
  styles: [`
    .full-width { width: 100%; }
    .actions { margin-top: 16px; }
  `]
})
export class TesisFormComponent {
  @Input() tesis?: Tesis;
  @Output() onGuardar = new EventEmitter<Partial<Tesis>>();

  formData: Partial<Tesis> = {};

  ngOnInit() {
    if (this.tesis) {
      this.formData = { ...this.tesis };
    }
  }

  guardar() {
    if (this.formData.titulo && this.formData.estado) {
      this.onGuardar.emit(this.formData);
    }
  }
}