import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-tutor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-card class="chat-container">
      <mat-card-header>
        <mat-card-title>Chat con Tutor IA</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div class="messages-container" #messagesContainer>
          @for (message of messages; track message.timestamp) {
            <div class="message" [class.user-message]="message.isUser">
              <div class="message-content">
                <div class="message-text">{{message.content}}</div>
                <div class="message-time">
                  {{message.timestamp | date:'shortTime'}}
                </div>
              </div>
            </div>
          }
          @if (loading) {
            <div class="message">
              <div class="message-content">
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          }
        </div>
      </mat-card-content>

      <mat-card-actions>
        <div class="input-container">
          <textarea
            matInput
            [(ngModel)]="currentMessage"
            placeholder="Escribe tu pregunta..."
            (keyup.enter)="enviarMensaje()"
            [disabled]="loading"
          ></textarea>
          <button 
            mat-fab 
            color="primary"
            (click)="enviarMensaje()"
            [disabled]="!currentMessage.trim() || loading"
          >
            <mat-icon>send</mat-icon>
          </button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .chat-container {
      max-width: 800px;
      margin: 20px auto;
      height: calc(100vh - 100px);
      display: flex;
      flex-direction: column;
    }

    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .message {
      display: flex;
      margin-bottom: 8px;

      .message-content {
        max-width: 70%;
        padding: 12px;
        border-radius: 12px;
        background-color: #f0f0f0;

        .message-text {
          white-space: pre-wrap;
          word-break: break-word;
        }

        .message-time {
          font-size: 0.8em;
          color: #666;
          margin-top: 4px;
        }
      }
    }

    .user-message {
      justify-content: flex-end;

      .message-content {
        background-color: #2196f3;
        color: white;

        .message-time {
          color: rgba(255,255,255,0.8);
        }
      }
    }

    .input-container {
      display: flex;
      gap: 16px;
      padding: 16px;
      align-items: flex-end;

      textarea {
        flex: 1;
        min-height: 56px;
        max-height: 150px;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        resize: vertical;
      }
    }

    .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 12px 16px;

      span {
        width: 8px;
        height: 8px;
        background: #90a4ae;
        border-radius: 50%;
        animation: bounce 1.3s linear infinite;

        &:nth-child(2) { animation-delay: 0.15s; }
        &:nth-child(3) { animation-delay: 0.3s; }
      }
    }

    @keyframes bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
    }
  `]
})
export class ChatTutorComponent implements AfterViewChecked {
  private apiService = inject(ApiService);
  
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: ChatMessage[] = [];
  currentMessage: string = '';
  loading: boolean = false;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

  async enviarMensaje() {
    if (!this.currentMessage.trim() || this.loading) return;

    const userMessage: ChatMessage = {
      content: this.currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    const mensaje = this.currentMessage;
    this.currentMessage = '';
    this.loading = true;

    try {
      const response: any = await this.apiService.consultarTutor(mensaje);
      
      this.messages.push({
        content: response.respuesta,
        isUser: false,
        timestamp: new Date()
      });
    } catch (error) {
      this.messages.push({
        content: 'Lo siento, ocurrió un error al procesar tu mensaje.',
        isUser: false,
        timestamp: new Date()
      });
      console.error('Error en la consulta:', error);
    } finally {
      this.loading = false;
    }
  }
}