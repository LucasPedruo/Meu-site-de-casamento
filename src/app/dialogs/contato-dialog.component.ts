import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contato-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Contato</h2>
    <mat-dialog-content>
      <p>Entre em contato pelo WhatsApp:       <a mat-button href="http://wa.me/5521988460135" target="_blank">Entrar em contato</a>
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="true">Fechar</button>
    </mat-dialog-actions>
  `,
})
export class ContatoDialogComponent {
  constructor(public dialogRef: MatDialogRef<ContatoDialogComponent>) { }
}