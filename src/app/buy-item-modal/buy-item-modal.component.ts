import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buy-item-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './buy-item-modal.component.html',
  styleUrl: './buy-item-modal.component.scss',
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
