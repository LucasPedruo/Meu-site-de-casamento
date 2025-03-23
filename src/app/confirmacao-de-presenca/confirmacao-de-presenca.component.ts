import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SheetService } from '../service/sheet.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
    selector: 'app-confirmacao-de-presenca',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule ],
    templateUrl: './confirmacao-de-presenca.component.html',
    styleUrl: './confirmacao-de-presenca.component.scss',
})
export class ConfirmacaoDePresencaComponent {

    constructor(
      private formBuilder: FormBuilder,
      private service: SheetService,
    ) {    }

    nome = '';
    valor = '' ;

    onSubmit() {

      console.log('Valores a serem enviados:', { nome: this.nome, valor: this.valor });

      const Nome = this.nome;
      const Status = this.valor;
  
      this.service.createSheet( Nome, Status).subscribe({
        
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
}
