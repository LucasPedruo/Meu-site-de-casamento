import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sugestao-nome-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule],
  template: `
    <h2 mat-dialog-title>Confirmação de Nome</h2>
    <mat-dialog-content>
      <p>Não encontramos exatamente "{{data.nomeDigitado}}" na nossa lista. Você é uma dessas pessoas?</p>
      <mat-selection-list #nomes [multiple]="false">
        <mat-list-option *ngFor="let nome of data.sugestoes" [value]="nome">
          {{nome}}
        </mat-list-option>
      </mat-selection-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close({contato: true})">Não estou na lista, quero entrar em contato</button>
      <button mat-button [disabled]="!nomes.selectedOptions.selected[0]?.value" 
              (click)="confirmarNome(nomes.selectedOptions.selected[0]?.value)">
        Sim, sou eu
      </button>
    </mat-dialog-actions>
  `,
})
export class SugestaoNomeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SugestaoNomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      nomeDigitado: string, 
      sugestoes: string[],
      valor: string
    }
  ) {}

  confirmarNome(nomeSelecionado: string) {
    this.dialogRef.close({
      confirmado: true,
      nomeSelecionado,
      valor: this.data.valor
    });
  }
}