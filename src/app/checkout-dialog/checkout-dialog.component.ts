// checkout-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, matDialogAnimations, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './checkout-dialog.component.html',
  styleUrl: './checkout-dialog.component.css'
})

export class CheckoutDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CheckoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initPayPal();
  }

  initPayPal() {
    // @ts-ignore
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.data.price.toString(),
              currency_code: 'BRL'
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          // Pagamento aprovado - implemente sua lógica aqui
          this.dialogRef.close({ success: true, orderID: details.id });
        });
      },
      onError: (err: any) => {
        console.error('Erro no PayPal:', err);
      }
    }).render(document.querySelector('#paypalButton'));
  }
}