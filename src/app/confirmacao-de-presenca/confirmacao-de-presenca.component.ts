import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmacaoPresencaService } from './confirmacao-presenca.service';

@Component({
    selector: 'app-confirmacao-de-presenca',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './confirmacao-de-presenca.component.html',
    styleUrl: './confirmacao-de-presenca.component.scss',
    styles: [`
    .container {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .radio-options {
      display: flex;
      gap: 20px;
    }
    .error {
      color: red;
      font-size: 12px;
      margin-top: 5px;
    }
    .submit-btn {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .submit-btn:disabled {
      background-color: #cccccc;
    }
    .success-message {
      color: green;
      margin-top: 15px;
    }
    .error-message {
      color: red;
      margin-top: 15px;
    }
  `]
})
export class ConfirmacaoDePresencaComponent {

    confirmationForm: FormGroup;
    submitted = false;
    error = false;

    constructor(
        private fb: FormBuilder,
        private confirmationService: ConfirmacaoPresencaService
    ) {
        this.confirmationForm = this.fb.group({
            name: ['', [Validators.required]],
            willAttend: [true, [Validators.required]]
        });
    }

    onSubmit() {
        if (this.confirmationForm.valid) {
            const formValue = this.confirmationForm.value;
            const confirmation = {
                name: formValue.name,
                willAttend: formValue.willAttend,
                timestamp: new Date()
            };

            this.confirmationService.submitConfirmation(confirmation).subscribe({
                next: () => {
                    this.submitted = true;
                    this.error = false;
                    this.confirmationForm.reset({ willAttend: true });
                },
                error: (err) => {
                    console.error('Erro ao enviar confirmação:', err);
                    this.error = true;
                    this.submitted = false;
                }
            });
        }
    }
}
