import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SheetService } from '../service/sheet.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

interface Pessoa {
  nome: string;
  valor: string;
}

@Component({
  selector: 'app-confirmacao-de-presenca',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './confirmacao-de-presenca.component.html',
  styleUrl: './confirmacao-de-presenca.component.scss',
})
export class ConfirmacaoDePresencaComponent {
  private _snackBar = inject(MatSnackBar);

  constructor(
    private formBuilder: FormBuilder,
    private service: SheetService,
  ) { }

  pessoas: Pessoa[] = [{ nome: '', valor: '' }];

  adicionarPessoa() {
    this.pessoas.push({ nome: '', valor: '' });
  }

  removerPessoa(index: number) {
    if (this.pessoas.length > 1) {
      this.pessoas.splice(index, 1);
    }
  }

  validarFormulario(): boolean {
    for (const pessoa of this.pessoas) {
      if (!pessoa.nome || !pessoa.valor) {
        return false;
      }
    }
    return true;
  }

  onSubmit() {
    if (!this.validarFormulario()) {
      const config: MatSnackBarConfig = {
        duration: 3000,
        panelClass: ['error-snackbar']
      };
      this._snackBar.open('Por favor, preencha todos os campos obrigatórios!', 'Fechar', config);
      return;
    }

    let confirmacoesConcluidas = 0;
    let erros = 0;

    for (const pessoa of this.pessoas) {
      console.log('Valores a serem enviados:', { nome: pessoa.nome, valor: pessoa.valor });

      this.service.createSheet(pessoa.nome, pessoa.valor).subscribe({
        next: (res) => {
          console.log(res);
          confirmacoesConcluidas++;
          
          if (confirmacoesConcluidas + erros === this.pessoas.length) {
            this.finalizarEnvio(confirmacoesConcluidas, erros);
          }
        },
        error: (error) => {
          console.log(error);
          erros++;
          
          if (confirmacoesConcluidas + erros === this.pessoas.length) {
            this.finalizarEnvio(confirmacoesConcluidas, erros);
          }
        },
      });
    }
  }

  private finalizarEnvio(sucessos: number, erros: number) {
    if (erros === 0) {
      const config: MatSnackBarConfig = {
        duration: 3000,
        panelClass: ['success-snackbar']
      };
      this._snackBar.open(`${sucessos} confirmação(ões) enviada(s) com sucesso!`, 'Fechar', config);
      this.limparFormulario();
    } else if (sucessos === 0) {
      const config: MatSnackBarConfig = {
        duration: 3000,
        panelClass: ['error-snackbar']
      };
      this._snackBar.open('Houve um erro com as confirmações!', 'Fechar', config);
    } else {
      const config: MatSnackBarConfig = {
        duration: 3000,
        panelClass: ['warning-snackbar']
      };
      this._snackBar.open(`${sucessos} confirmação(ões) enviada(s) com sucesso e ${erros} falha(s)!`, 'Fechar', config);
      this.limparFormulario();
    }
  }

  private limparFormulario() {
    this.pessoas = [{ nome: '', valor: '' }];
  }
}