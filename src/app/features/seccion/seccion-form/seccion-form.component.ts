import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SeccionTesis } from '../../../core/models/tesis.model';

@Component({
  selector: 'app-seccion-form',
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
      <mat-card-title>{{seccion?.id ? 'Editar Sección' : 'Nueva Sección'}}</mat-card-title>
      <form (ngSubmit)="guardar()">
        <mat-form-field class="full-width">
          <mat-label>Tipo de Sección</mat-label>
          <input matInput [(ngModel)]="formData.tipo_seccion" name="tipo_seccion" required>
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Contenido</mat-label>
          <textarea matInput [(ngModel)]="formData.contenido" name="contenido" rows="8" required></textarea>
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
export class SeccionFormComponent {
  @Input() seccion?: SeccionTesis;
  @Output() onGuardar = new EventEmitter<Partial<SeccionTesis>>();

  formData: Partial<SeccionTesis> = {};

  ngOnInit() {
    if (this.seccion) {
      this.formData = { ...this.seccion };
    }
  }

  guardar() {
    if (this.formData.tipo_seccion && this.formData.contenido) {
      this.onGuardar.emit(this.formData);
    }
  }
}