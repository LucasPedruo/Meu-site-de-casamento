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
  pixCode: string = '';
  preencherDados: boolean = false
  pix: boolean = false;
  credito: boolean = false

  gerarPix() {
    this.pix = true;
  }

  preencherDadosOpen() {
    this.preencherDados = true
  }

  constructor(
    public dialogRef: MatDialogRef<BuyItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.item = this.data.item;
  }

  onSubmit() {
    if (!this.userName || !this.userEmail) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.paymentDataSubmitted = true;
    this.sendPaymentDataToAPI();
  }

  private async sendPaymentDataToAPI() {
    try {
      const params = new URLSearchParams({
        nome: this.userName,
        email: this.userEmail,
        preco: this.item?.price.toString(),
        item: this.item?.title
      });

      const response = await fetch(`https://frangonacaixaoficial.online/pagamentoLucas?${params}`);

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

      const data = await response.json();
      this.paymentUrl = data.checkout_init_point;
      this.pixUrl = 'data:image/png;base64,' + data.pix_qr_code_base64;
      this.paymentId = data.full_info_for_developer.pix.id;
      this.pixCode = data.pix_qr_code;

      this.startPaymentStatusCheck();
    } catch (error) {
      console.error('Erro ao enviar dados de pagamento:', error);
      this.errorMessage = 'Houve um erro ao processar seu pagamento. Tente novamente mais tarde.';
      this.paymentDataSubmitted = false;
    }
  }

  private startPaymentStatusCheck() {
    const checkPaymentStatus = setInterval(async () => {
      try {
        const response = await fetch(`https://frangonacaixaoficial.online/notificacaoLucas?id=${this.paymentId}`);
        const data = await response.json();

        if (data.status === 'approved') {
          clearInterval(checkPaymentStatus);
          this.paymentSuccess = true;
        } else if (data.status === 'rejected') {
          clearInterval(checkPaymentStatus);
          alert('Pagamento rejeitado. Tente novamente.');
          this.paymentDataSubmitted = false;
        }
      } catch (error) {
        console.error('Erro ao verificar status do pagamento:', error);
      }
    }, 2000);

    // Limpar o intervalo após 5 minutos para evitar chamadas infinitas
    setTimeout(() => clearInterval(checkPaymentStatus), 300000);
  }

  redirectToPayment(): void {
    if (this.paymentUrl) {
      window.location.href = this.paymentUrl;
    } else {
      console.error('URL de pagamento não encontrada');
    }
  }

  copyPixCode(): void {
    navigator.clipboard.writeText('00020126360014BR.GOV.BCB.PIX0114+55219696858685204000053039865802BR5925Larissa da Rocha Teixeira6009SAO PAULO62140510CYKNQycruo630400C2')
      .then(() => alert('Código PIX copiado para a área de transferência'))
      .catch(err => {
        console.error('Erro ao copiar código:', err);
        alert('Erro ao copiar código. Por favor, tente copiar manualmente.');
      });
  }

  chavePix : boolean = false

  copyChave(): void {
    navigator.clipboard.writeText('21969685868')
      .then(() => alert('Chave PIX copiado para a área de transferência'))
      .catch(err => {
        console.error('Erro ao copiar a chave:', err);
        alert('Erro ao copiar a chave. Por favor, tente copiar manualmente.');
      });
  }

  exibirChavePix(){
    this.chavePix = !this.chavePix
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}