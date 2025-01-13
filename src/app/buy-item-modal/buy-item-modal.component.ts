import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buy-item-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  template: `
    <div class="modal-content">
      <div *ngIf="paymentSuccess">
        <div class="success-content">
          <i class="material-icons success-icon">check_circle</i>
          <h2>Pagamento Realizado com Sucesso!</h2>
          <p>Obrigado por sua compra! Seu pedido foi confirmado.</p>
        </div>
      </div>

      <div *ngIf="!paymentSuccess">
        <h2 class="modal-title">Confirmar Compra</h2>
        
        <div *ngIf="!paymentDataSubmitted" class="form-container">
          <h3 class="form-title">Informe seus dados para continuar</h3>
          <form (ngSubmit)="onSubmit()" #paymentForm="ngForm" class="payment-form">
            <div class="form-group">
              <label for="name">Nome</label>
              <input type="text" id="name" name="name" [(ngModel)]="userName" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" [(ngModel)]="userEmail" required />
            </div>
            <button type="submit" mat-button [disabled]="!paymentForm.valid" class="submit-button">
              Enviar
            </button>
          </form>
        </div>

        <!-- Tela de carregamento enquanto o PIX não é gerado -->
        <div *ngIf="paymentDataSubmitted && !pixUrl" class="loading-container">
          <p>Gerando QR Code do pagamento...</p>
        </div>

        <!-- Quando o PIX QR code estiver disponível -->
        <div *ngIf="paymentDataSubmitted && pixUrl" class="pix-container">
          <h3>Pagamento via PIX</h3>
          <p>Use o QR code abaixo para pagar:</p>
          <img [src]="pixUrl" alt="QR Code Pix" width="200" />
          <div class="copy-container">
            <input 
              type="text" 
              readonly 
              [value]="pixcec" 
              class="copy-input"
            />
            <button mat-button (click)="copyQRCode()" class="copy-button">
              Copiar
            </button>
          </div>
        </div>

        <div *ngIf="paymentDataSubmitted && !pixUrl" class="mercadopago-container">
          <h3>Pagamento via Mercado Pago</h3>
        </div>
      </div>

      <div class="actions" *ngIf="!paymentSuccess">
        <button 
          mat-button 
          *ngIf="!paymentDataSubmitted" 
          (click)="closeModal()" 
          class="cancel-button"
        >
          Cancelar
        </button>
        <button 
          mat-button 
          *ngIf="pixUrl" 
          (click)="redirectToSandbox()" 
          class="alternate-payment-button"
        >
          Pagar de outra forma
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-content {
        border-radius: 8px;
        padding: 20px;
        max-width: 100%;
        margin: auto;
        text-align: center;
      }

      .modal-title {
        font-size: 1.8rem;
        margin-bottom: 15px;
        color: #333;
      }

      .form-container {
        text-align: left;
      }

      .form-title {
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: #555;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        font-size: 0.9rem;
        color: #555;
        margin-bottom: 5px;
      }

      .form-group input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }

      .submit-button {
        width: 100%;
        padding: 10px;
        background-color: #1976d2;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
      }

      .submit-button[disabled] {
        background-color: #aaa;
        cursor: not-allowed;
      }

      .pix-container,
      .mercadopago-container {
        margin-top: 15px;
        text-align: center;
      }

      .pix-container img {
        margin-top: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }

      .loading-container {
        margin-top: 15px;
        color: #1976d2;
        font-size: 1.2rem;
        font-weight: bold;
      }

      .actions {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        gap: 10px;
      }

      .cancel-button {
        background-color: #f44336;
        color: #fff;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        border: none;
      }

      .alternate-payment-button {
        background-color: #00796b;
        color: #fff;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        margin-left: 50px;
      }

      .success-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .success-icon {
        font-size: 80px;
        color: #4caf50;
        margin-bottom: 10px;
      }

      .copy-container {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .copy-input {
        width: 80%;
        padding: 8px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-right: 10px;
      }

      .copy-button {
        background-color: #1976d2;
        color: #fff;
        padding: 8px 12px;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        min-width: 100px;
      }
    `,
  ],
})
export class BuyItemModalComponent implements OnInit {
  item: any;
  paymentUrl: string = '';
  pixUrl: string = '';
  userName: string = '';
  userEmail: string = '';
  paymentDataSubmitted: boolean = false;
  errorMessage: string = '';
  paymentId: string = '';
  paymentSuccess: boolean = false;
  pixcec: string = '';

  constructor(
    public dialogRef: MatDialogRef<BuyItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.item = this.data.item;
  }

  onSubmit() {
    if (this.userName && this.userEmail) {
      this.paymentDataSubmitted = true;
      this.sendPaymentDataToAPI();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  sendPaymentDataToAPI() {
    var params = `nome=${this.userName}`;
    params += `&email=${this.userEmail}`;
    params += `&preco=${this.item?.price}`;
    params += `&item=${this.item?.title}`;

    fetch(`https://frangonacaixaoficial.online/pagamentoLucas?${params}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao processar pagamento');
        }
        return response.json();
      })
      .then((data) => {
        this.paymentUrl = data.checkout_init_point;
        this.pixUrl = 'data:image/png;base64,' + data.pix_qr_code_base64;
        this.paymentId = data.full_info_for_developer.pix.id;
        this.pixcec = data.pix_qr_code;
        this.startPaymentStatusCheck();
      })
      .catch((error) => {
        console.error('Erro ao enviar dados de pagamento', error);
        this.errorMessage = 'Houve um erro ao processar seu pagamento. Tente novamente mais tarde.';
        this.paymentDataSubmitted = false;
      });
  }

  startPaymentStatusCheck() {
    const checkPaymentStatus = setInterval(() => {
      fetch(`https://frangonacaixaoficial.online/notificacaoLucas?id=${this.paymentId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'approved') {
            clearInterval(checkPaymentStatus);
            this.paymentSuccess = true;
          } else if (data.status === 'rejected') {
            clearInterval(checkPaymentStatus);
            alert('Pagamento rejeitado. Tente novamente.');
            this.paymentDataSubmitted = false;
          }
        })
        .catch((error) => {
          console.error('Erro ao verificar status do pagamento', error);
        });
    }, 2000);
  }

  redirectToPayment(): void {
    if (this.paymentUrl) {
      window.location.href = this.paymentUrl;
    } else {
      console.error('URL de pagamento não encontrada');
    }
  }

  redirectToSandbox(): void {
    if (this.paymentUrl) {
      const sandboxUrl = this.paymentUrl.replace(
        'https://www.mercadopago.com.br',
        'https://sandbox.mercadopago.com.br'
      );
      window.location.href = sandboxUrl;
    } else {
      console.error('URL de pagamento não encontrada');
    }
  }

  copyQRCode(): void {
    const copyText = document.createElement('input');
    copyText.value = this.pixUrl;
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand('copy');
    document.body.removeChild(copyText);
    alert('QR Code copiado para a área de transferência');
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
