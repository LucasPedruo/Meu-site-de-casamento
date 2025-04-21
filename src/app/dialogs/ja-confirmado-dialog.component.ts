import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ja-confirmado-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmação Já Realizada</h2>
    <mat-dialog-content>
      <p>{{data.nome}}, sua presença já foi confirmada anteriormente.</p>
      <p>Se não foi você quem confirmou, por favor, entre em contato conosco.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="contato()">Entrar em contato</button>
      <button mat-button [mat-dialog-close]="true">Ok</button>
    </mat-dialog-actions>
  `,
})
export class JaConfirmadoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<JaConfirmadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string }
  ) {}

  contato() {
    this.dialogRef.close({ contato: true });
  }
}