import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato-input-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>Informação de Contato</h2>
    <mat-dialog-content>
      <p>Olá, {{data.nome}}! Por favor, informe seu número de telefone:</p>
      <mat-form-field class="full-width">
        <mat-label>Número de Telefone</mat-label>
        <input type="tel" matInput [(ngModel)]="telefone" placeholder="(00) 00000-0000">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancelar</button>
      <button mat-button [disabled]="!telefone" (click)="confirmar()">Confirmar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
  `]
})
export class ContatoInputDialogComponent {
  telefone = '';

  constructor(
    public dialogRef: MatDialogRef<ContatoInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string }
  ) {}

  confirmar() {
    this.dialogRef.close({
      telefone: this.telefone
    });
  }
}