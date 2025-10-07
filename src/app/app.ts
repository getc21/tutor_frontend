import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary">
        <span>Tutor de Tesis Virtual</span>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav mode="side" opened class="sidenav">
          <mat-nav-list>
            <a mat-list-item routerLink="/tesis" routerLinkActive="active">
              <mat-icon>description</mat-icon>
              <span>Mis Tesis</span>
            </a>
            <a mat-list-item routerLink="/secciones" routerLinkActive="active">
              <mat-icon>folder</mat-icon>
              <span>Secciones</span>
            </a>
            <a mat-list-item routerLink="/retroalimentaciones" routerLinkActive="active">
              <mat-icon>feedback</mat-icon>
              <span>Retroalimentaciones</span>
            </a>
            <a mat-list-item routerLink="/tutor" routerLinkActive="active">
              <mat-icon>chat</mat-icon>
              <span>Chat con Tutor</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .sidenav-container {
      flex: 1;
    }

    .sidenav {
      width: 250px;
      padding: 16px 0;
    }

    .content {
      padding: 24px;
      background-color: #f5f5f5;
    }

    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .active {
      background-color: rgba(63, 81, 181, 0.1);
    }

    mat-icon {
      color: rgba(0, 0, 0, 0.54);
    }

    .active mat-icon {
      color: #3f51b5;
    }
  `]
})
export class AppComponent {
  title = 'Tutor de Tesis';
}