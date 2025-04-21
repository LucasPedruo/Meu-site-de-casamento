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
      <p>Para entrar em contato conosco, por favor envie um e-mail para:</p>
      <p><strong>aaaaaaaaaaa</strong></p>
      <p>Ou entre em contato pelo WhatsApp: <strong>(11) 99999-9999</strong></p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="true">Fechar</button>
    </mat-dialog-actions>
  `,
})
export class ContatoDialogComponent {
  constructor(public dialogRef: MatDialogRef<ContatoDialogComponent>) {}
}