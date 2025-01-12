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
        <h2>Confirmar Compra</h2>
        
        <div *ngIf="!paymentDataSubmitted">
          <h3>Informe seus dados para continuar</h3>
          <form (ngSubmit)="onSubmit()" #paymentForm="ngForm">
            <label for="name">Nome</label>
            <input type="text" id="name" name="name" [(ngModel)]="userName" required />
            <br />
            <label for="email">Email</label>
            <input type="email" id="email" name="email" [(ngModel)]="userEmail" required />
            <br />
            <button type="submit" mat-button [disabled]="!paymentForm.valid">Enviar</button>
          </form>
        </div>

        <div *ngIf="paymentDataSubmitted && pixUrl">
          <h3>Pagamento via PIX</h3>
          <p>Use o QR code abaixo para pagar:</p>
          <img [src]="pixUrl" alt="QR Code Pix" width="200">
        </div>

        <div *ngIf="paymentDataSubmitted && !pixUrl">
          <h3>Pagamento via Mercado Pago</h3>
          <button mat-button (click)="redirectToPayment()">Pagar agora</button>
        </div>
      </div>

      <div class="actions" *ngIf="!paymentSuccess">
        <button mat-button (click)="redirectToSandbox()">Pagar de outra forma</button>
        <button mat-button (click)="closeModal()">Cancelar</button>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-content {
        text-align: center;
        padding: 20px;
      }
      .success-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .success-icon {
        font-size: 80px;
        color: green;
        margin-bottom: 10px;
      }
      .actions {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        gap: 10px;
      }
      img {
        margin-top: 15px;
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
      const sandboxUrl = this.paymentUrl.replace('https://www.mercadopago.com.br', 'https://sandbox.mercadopago.com.br');
      window.location.href = sandboxUrl;
    } else {
      console.error('URL de pagamento não encontrada');
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
