import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nao-convidado-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Nome não encontrado</h2>
    <mat-dialog-content>
      <p>Não encontramos seu nome na nossa lista de convidados.</p>
      <p>Se acha que isso é um erro, por favor entre em contato conosco.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="contato()">Entrar em contato</button>
      <button mat-button [mat-dialog-close]="true">Ok</button>
    </mat-dialog-actions>
  `,
})
export class NaoConvidadoDialogComponent {
  constructor(public dialogRef: MatDialogRef<NaoConvidadoDialogComponent>) {}

  contato() {
    this.dialogRef.close({ contato: true });
  }
}