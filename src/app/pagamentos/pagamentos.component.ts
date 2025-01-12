import { Component, OnInit } from '@angular/core';
import { loadMercadoPago } from '@mercadopago/sdk-js';

@Component({
  selector: 'app-pagamentos',
  imports: [],
  standalone: true,
  templateUrl: './pagamentos.component.html',
  styleUrl: './pagamentos.component.scss'
})
export class PagamentosComponent implements OnInit {

  ngAfterViewInit(): void {
    const cardForm = this.mp.cardForm({
      amount: '100.5', // Substitua pelo valor do pagamento
      iframe: true,
      form: {
        id: 'form-checkout',
        cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Número do cartão' },
        expirationDate: { id: 'form-checkout__expirationDate', placeholder: 'MM/YY' },
        securityCode: { id: 'form-checkout__securityCode', placeholder: 'Código de segurança' },
        cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Titular do cartão' },
        issuer: { id: 'form-checkout__issuer', placeholder: 'Banco emissor' },
        installments: { id: 'form-checkout__installments', placeholder: 'Parcelas' },
        identificationType: { id: 'form-checkout__identificationType', placeholder: 'Tipo de documento' },
        identificationNumber: { id: 'form-checkout__identificationNumber', placeholder: 'Número do documento' },
        cardholderEmail: { id: 'form-checkout__cardholderEmail', placeholder: 'E-mail' },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn('Erro ao montar o formulário:', error);
          console.log('Formulário montado com sucesso.');
        },
        onSubmit: (event: Event) => {
          event.preventDefault();
  
          const cardData = cardForm.getCardFormData();
          console.log('Dados do cartão:', cardData);
  
          // Enviar dados para o backend
          this.enviarDadosParaBackend(cardData);
        },
        onFetching: (resource: any) => {
          console.log('Carregando recurso:', resource);
  
          const progressBar = document.querySelector('.progress-bar') as HTMLProgressElement;
          progressBar.removeAttribute('value');
  
          return () => {
            progressBar.setAttribute('value', '0');
          };
        },
      },
    });
  }
  
  private enviarDadosParaBackend(cardData: any): void {
    fetch('/process_payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: cardData.token,
        issuer_id: cardData.issuerId,
        payment_method_id: cardData.paymentMethodId,
        transaction_amount: Number(cardData.amount),
        installments: Number(cardData.installments),
        description: 'Descrição do produto',
        payer: {
          email: cardData.cardholderEmail,
          identification: {
            type: cardData.identificationType,
            number: cardData.identificationNumber,
          },
        },
      }),
    });
  }
  
  private mp: any;

  async ngOnInit(): Promise<void> {
    await loadMercadoPago();
    this.mp = new (window as any).MercadoPago('TEST-3fc69419-edd7-4101-b061-508b21c51fbe');
  }
}