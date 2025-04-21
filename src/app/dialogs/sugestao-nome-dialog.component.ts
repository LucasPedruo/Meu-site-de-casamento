import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sugestao-nome-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatListModule, 
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>{{ step === 1 ? 'Confirmação de Nome' : 'Informação de Contato' }}</h2>
    <mat-dialog-content>
      <!-- Step 1: Name selection -->
      <div *ngIf="step === 1">
        <p>Não encontramos exatamente "{{data.nomeDigitado}}" na nossa lista. Você é uma dessas pessoas?</p>
        <mat-selection-list #nomesList [multiple]="false">
          <mat-list-option *ngFor="let nome of data.sugestoes" [value]="nome">
            {{nome}}
          </mat-list-option>
        </mat-selection-list>
      </div>

      <!-- Step 2: Phone number input -->
      <div *ngIf="step === 2">
        <p>Olá, {{selectedName}}! Por favor, informe seu número de telefone:</p>
        <mat-form-field class="full-width">
          <mat-label>Número de Telefone</mat-label>
          <input type="tel" matInput [(ngModel)]="phoneNumber" placeholder="(00) 00000-0000">
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button *ngIf="step === 1" mat-button (click)="dialogRef.close({contato: true})">
        Não estou na lista, quero entrar em contato
      </button>
      <button *ngIf="step === 1" mat-button [disabled]="!hasSelectedName()" 
              (click)="selectName()">
        Sim, sou eu
      </button>
      <button *ngIf="step === 2" mat-button (click)="step = 1">Voltar</button>
      <button *ngIf="step === 2" mat-button [disabled]="!phoneNumber" 
              (click)="confirmarNome()">
        Confirmar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
  `]
})
export class SugestaoNomeDialogComponent {
  @ViewChild('nomesList') nomesList!: MatSelectionList;
  
  step = 1;
  selectedName = '';
  phoneNumber = '';

  constructor(
    public dialogRef: MatDialogRef<SugestaoNomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      nomeDigitado: string, 
      sugestoes: string[],
      valor: string
    }
  ) {}

  hasSelectedName(): boolean {
    if (!this.nomesList) return false;
    return this.nomesList.selectedOptions.selected.length > 0;
  }

  selectName() {
    if (this.nomesList && this.nomesList.selectedOptions.selected[0]) {
      this.selectedName = this.nomesList.selectedOptions.selected[0].value;
      this.step = 2;
    }
  }

  confirmarNome() {
    this.dialogRef.close({
      confirmado: true,
      nomeSelecionado: this.selectedName,
      telefone: this.phoneNumber,
      valor: this.data.valor
    });
  }
}